import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addTodoStepModel from "../../models/addTodoStepModel";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosModel from "../../models/getTodosModel";

describe('addTodoStepModel', () => {

  let testTodos : any;

  let req = {
    session: {},
    body: {},
    params: {}
  } as Request;

  let req2 = {
    session: {},
    body: {},
    params: {}
  } as Request;

  test('it 401s if there is no session', () => {
    addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it adds a test user and todo', () => {
    req.body = {
      email: 'add todo step test',
      name: 'add todo step test',
      pword: 'test'
    };

    return addUserModel(req)
    .then(() => {
      req.body = {
        todo: 'add todo step test',
        done: false,
        dueDate: '2021-11-01'
      };
      return addTodoModel(req);
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
    });
  });

  test ('it 406s with no todoId in params', () => {
    req.body = {};
    return addTodoStepModel(req) 
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with no body', () => {
    req.params.userId = testTodos[0].id;
    delete req.body;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with the wrong todoId type', () => {
    req.params.todoId = 'hello';
    req.body = {};
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with no step', () => {
    req.params.todoId = testTodos[0].id;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with the wrong step type', () => {
    req.body.step = 1;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s with no done', () => {
    req.body.step = 'test add step';
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 401s if the wrong user tries to add a step', () => {
    req2.body = {
        email: 'add test step user 2',
        name: 'add test step user 2', 
        pword: 'test'
      };

    return addUserModel(req2)
    .then(() => {
      req2.params.todoId = testTodos[0].id;
      req2.body = {
        step: 'this should fail',
        done: false
      };
      return addTodoStepModel(req2);
    })
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it lets you add a todo step', () => {
    req.body.done = false;
    return addTodoStepModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('todo step added');
      return;
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      expect(resp.todos[0].steps[0].step).toBe('test add step');
      expect(resp.todos[0].steps[0].done).toBeFalsy();
      expect(resp.todos[0].steps[0].id).toBeTruthy();
    });
  });

  test('it lets you add a second step', () => {
    req.body = {
      step: 'add test step 2',
      done: true,
    };

    return addTodoStepModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('todo step added');
      return;
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      expect(resp.todos[0].steps.length).toBe(2);
      expect(resp.todos[0].steps[1].step).toBe('add test step 2');
      expect(resp.todos[0].steps[1].done).toBeTruthy();
    });
  });

  test('it strips the non a-9 characters and spaces', () => {
    req.body = {
      step: '    add test ><>$step 3 #$$',
      done: false,
    };

    return addTodoStepModel(req)
    .then(() => getTodosModel(req))
    .then(resp => {
      expect(resp.todos[0].steps.length).toBe(3);
      expect(resp.todos[0].steps[2].step).toBe('add test step 3');
    });
  });

  test('clean up test', async () => {
    await deleteUserFromDB('add todo step test');
    await deleteUserFromDB('add test step user 2');
    return;
  });
});