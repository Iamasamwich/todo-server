import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addTodoStepModel from "../../models/addTodoStepModel";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserDetails from "../../models/functions/getUserDetails";
import getTodosModel from "../../models/getTodosModel";

describe('addTodoStepModel', () => {

  let testTodos : any;

  let req = {
    session: {},
    body: {}
  } as Request;

  test('it adds a test user and todo', () => {
    req.body = {
      email: 'add todo step test',
      name: 'add todo step test',
      pword: 'test'
    };

    return addUserModel(req)
    .then(() => getUserDetails('add todo step test'))
    .then(resp => {
      req.session.loggedIn = true;
      req.session.userId = resp.id;
      req.body = {
        todo: 'add todo step test',
        done: false,
        dueDate: '2021-11-01'
      };
      return;
    })
    .then(() => addTodoModel(req))
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
    });
  });

  test('it 401s with no body', () => {
    delete req.body;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('no body');
    });
  });

  test('it 401s with the no todoId', () => {
    req.body = {}
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('no todoId');
    });
  });

  test('it 401s with the wrong todoId type', () => {
    req.body = {
      todoId: 'hello'
    };

    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('todoid not number');
    });
  });

  test('it 401s with no step', () => {
    req.body.todoId = testTodos[0].id;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('no step');
    });
  });

  test('it 401s with the wrong step type', () => {
    req.body.step = 1;
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('step not string');
    });
  });

  test('it 401s with no done', () => {
    req.body.step = 'test add step';
    return addTodoStepModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('no done');
    });
  });

  test('add a second user', () => {
    const req2 = {
      session: {},
      body: {
        email: 'add test step user 2',
        name: 'add test step user 2', 
        pword: 'test'
      } 
    } as Request;

    return addUserModel(req2)
    .then(() => getUserDetails('add test step user 2'))
    .then(resp => resp.id)
    .then(user2Id => {
      req2.session.userId = user2Id;
      req2.session.loggedIn = true;
      req2.body = {
        todoId: testTodos[0].id,
        step: 'this should fail',
        done: false
      };
      return;
    })
    .then(() => addTodoStepModel(req2))
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
      todoId: testTodos[0].id
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

  test('clean up test', async () => {
    await deleteUserFromDB('add todo step test');
    await deleteUserFromDB('add test step user 2');
    return;
  });
});