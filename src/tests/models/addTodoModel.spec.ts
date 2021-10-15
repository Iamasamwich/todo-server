import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosModel from "../../models/getTodosModel";

describe('addTodoModel', () => {

  const req = {
    body: {
    },
    session: {}
  } as Request;

  test('it 401s without a session', () => {
    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s without a userId in session', () => {
    req.session.loggedIn = true;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s without loggedIn true in session', () => {
    req.session.userId = 'test id';
    delete req.session.loggedIn;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 404s if the user doesnt exist', () => {
    req.session.loggedIn = true;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('user not found');
    });
  });

  test('add user for testing', async () => {

    delete req.session.loggedIn;
    delete req.session.userId;

    req.body = {
      email: 'add user test email', 
      name: 'test name', 
      pword: 'test pword'
    };

    return await addUserModel(req);
  });

  test('it 406s without a body', () => {
    delete req.body;
    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s without a todo in body', () => {
    req.body = {};

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the todo isnt a string', () => {
    req.body = {
        todo: 1,
        dueDate: '2021-10-11',
        done: false
    };

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the date is the wrong format', () => {
    req.body.todo = 'test todo';
    req.body.dueDate = 'wrong format';

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if there isnt done in the body', () => {
    req.body.dueDate = '2021-10-11';
    delete req.body.done;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406)
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if body.done is the wrong type', () => {
    req.body.done = 'hello';

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it adds a todo', () => {
    req.body.done = false;

    return addTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('todo added');
      return getTodosModel(req);
    })
    .then(resp => {
      expect(resp.todos[0]).toStrictEqual({
        id: resp.todos[0].id,
        done: 0,
        dueDate: '2021-10-11',
        todo: 'test todo',
        steps: []
      });
    });
  });

  test('it strips the non a-zA-Z0-9 ., characters out and extra spaces', () => {
    req.body = {
      todo: '   test todo 2 @#$%^&,. ',
      dueDate: '2021-11-11',
      done: false
    };

    return addTodoModel(req)
    .then(() => getTodosModel(req))
    .then(resp => {
      expect(resp.todos[1]).toStrictEqual({
        id: resp.todos[1].id,
        todo: 'test todo 2 ,.',
        dueDate: '2021-11-11',
        done: 0,
        steps: []
      });
    });
  })

  

  test('clean up test user', async () => {
    return await deleteUserFromDB('add user test email');
  });
});