import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addTodoStepModel from "../../models/addTodoStepModel";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosModel from "../../models/getTodosModel";
import updateTodoModel from "../../models/updateTodoModel";
import updateTodoStepModel from "../../models/updateTodoStepModel";

describe('updateTodoStepModel', () => {

  const req = {
    body: {},
    session: {},
    params: {}
  } as Request;

  interface Todos {
    id: number,
    done: boolean,
    dueDate: string,
    todo: string,
    steps: {id: number, todoId: number, step: string, done: boolean}[]
  }

  let testTodos : Todos[];

  test('it creates a user with todos with steps', () => {
    req.body = {
      name: 'update todo step test',
      email: 'update todo step test',
      pword: 'test'
    };

    return addUserModel(req)
    .then(() => {
      req.body = {
        todo: 'update todo step test',
        dueDate: '2021-11-12',
        done: false
      };
      return addTodoModel(req)
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
    })
    .then(() => {
      req.params.todoId = String(testTodos[0].id);
      req.body = {
        step: 'update step test',
        done: false
      };
      return addTodoStepModel(req);
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
      return;
    });
  });

  test('it 406s with no todoId in params', () => {
    req.params = {};
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if todoId is not a "number"', () => {
    req.params.todoId = 'hello';
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with no body', () => {
    req.params.todoId = String(testTodos[0].id);
    delete req.body;
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s without a done of true or false', () => {
    req.body = {
      step: 'updated todo step'
    };
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with no stepId in params', () => {
    req.body.done = true;
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it wont let you update someone elses todo step', () => {
    const req2 = {
      session: {},
      params: {},
      body: {name: 'should fail', email: 'should fail', pword: 'test'}
    } as Request;

    return addUserModel(req2)
    .then(() => {
      req2.params = {
        todoId: String(testTodos[0].id),
        stepId: String(testTodos[0].steps[0].id)
      };
      req2.body = {
        done: true,
        step: 'this shouldnt work'
      };
      return updateTodoStepModel(req2);
    })
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 404s if there is no step to update', () => {
    req.params.stepId = '1';
    return updateTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('step not found');
    });
  });

  test('it updates a todo step', () => {
    req.params.stepId = String(testTodos[0].steps[0].id);
    req.body = {
      step: 'updated step test',
      done: true
    };
    return updateTodoStepModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('todo step updated');
      expect(resp.step).toBeTruthy();
      expect(resp.step.step).toBe('updated step test');
      expect(resp.step.done).toBeTruthy();
      expect(resp.step.todoId).toBe(testTodos[0].id);
      expect(resp.step.id).toBe(testTodos[0].steps[0].id);
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      const todo = resp.todos[0];
      const step = todo.steps[0];
      expect(step.done).toBeTruthy();
      expect(step.step).toBe('updated step test');
    });
  });

  test('clean up tests', () => {
    deleteUserFromDB('update todo step test');
    deleteUserFromDB('should fail');
    return;
  });

});