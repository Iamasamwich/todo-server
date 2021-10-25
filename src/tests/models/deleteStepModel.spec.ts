import { Request } from "express"
import { TodoWithSteps } from "../../interfaces";
import addTodoModel from "../../models/addTodoModel";
import addTodoStepModel from "../../models/addTodoStepModel";
import addUserModel from "../../models/addUserModel";
import deleteStepModel from "../../models/deleteStepModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosModel from "../../models/getTodosModel";

describe('deleteStepModel', () => {

  const req = {
    session: {},
    body: {},
    params: {}
  } as Request;

  const req2 = {
    session: {},
    body: {},
    params: {}
  } as Request;

  let testTodos : TodoWithSteps[] = [];

  test('it adds a test user with a todo and steps', () => {
    req.body = {name: 'deleteStepModel test', email: 'deleteStepModel test', pword: 'test'};
    return addUserModel(req)
    .then(() => {
      req.body = {todo: 'deleteStepModel test', done: false, dueDate: '2021-12-01'};
      return addTodoModel(req);
    })
    .then(resp => {
      testTodos.push(resp.todo);
      req.body = {step: 'deleteStepModel test 1', done: false};
      req.params.todoId = String(testTodos[0].id);
      return addTodoStepModel(req);
    })
    .then(() => {
      req.body = {step: 'deleteStepModel test 2', done: false};
      return addTodoStepModel(req);
    })
    .then(() => {
      req.params = {};
      req.body = {};
      return getTodosModel(req)
    })
    .then(resp => {
      testTodos = resp.todos;
    });
  });

  test('it deletes a step', () => {
    req.params = {todoId: String(testTodos[0].id), stepId: String(testTodos[0].steps[0].id)};

    return deleteStepModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('step deleted');
      return;
    })
    .then(() => {
      req.body = {};
      req.params = {};
      return getTodosModel(req)
    })
    .then(resp => {
      expect(resp.todos.length).toBe(1);
      expect(resp.todos[0].steps.length).toBe(1);
      expect(resp.todos[0].steps[0].id).toBe(testTodos[0].steps[1].id);
      expect(resp.todos[0].steps[0].step).toBe('deleteStepModel test 2');
    });
  });

  test('it 404s if the step doesnt exist', () => {
    req.params = {todoId: String(testTodos[0].id), stepId: String(testTodos[0].steps[0].id)};
    return deleteStepModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('step not found');
    });
  });

  test('it 401s if the user is not logged in', () => {
    return deleteStepModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s if the todo doesnt belong to the owner', () => {
    req2.body = {name: 'deleteStepModel test 2', email: 'deleteStepModel test 2', pword: 'test'};
    return addUserModel(req2)
    .then(() => {
      req2.params = {stepId: String(testTodos[0].steps[0].id), todoId: String(testTodos[0].id)};
      return deleteStepModel(req2)
    })
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 406s if there are no params', () => {
    const req3 = {
      session: req2.session
    } as Request;

    return deleteStepModel(req3)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the todoId is not valid', () => {
    req.params = {};
    return deleteStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    })
    .then(() => {
      req.params.todoId = 'hello';
      return deleteStepModel(req)
    })
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the stepId is not valid', () => {
    req.params.todoId = String(testTodos[0].id);
    return deleteStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
      req.params.stepId = 'hello';
      return deleteStepModel(req)
    })
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });
  
  test('clean up tests', async () => {
    await deleteUserFromDB('deleteStepModel test');
    await deleteUserFromDB('deleteStepModel test 2');
    return;
  });
});