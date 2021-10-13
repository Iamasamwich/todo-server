import { Request } from "express";
import addTodoModel from "../../models/addTodo.model";
import addUserToDB from "../../models/functions/addUserToDB";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserDetails from "../../models/functions/getUserDetails";

describe('addTodoModel', () => {

  let testUserId : string;

  test('it 401s without a session', () => {
    const req = {
      body: {},
    } as Request

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s without a userId in session', () => {
    const req = {body: {}, session: {loggedIn: true}} as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s without loggedIn true in session', () => {
    const req = {body: {}, session: {userId: 'test id'}} as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 404s if the user doesnt exist', () => {
    const req = {body: {}, session: {userId: 'test id', loggedIn: true}} as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('user not found');
    });
  });

  test('add user for testing', async () => {
    return await addUserToDB({email: 'add user test email', name: 'test name', pword: 'test pword'})
    .then(() => getUserDetails('add user test email'))
    .then(resp => {
      testUserId = resp.id;
    });
  });

  test('it 406s without a body', () => {
    const req = {session: {loggedIn: true, userId: testUserId}} as Request;
    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s without a todo in body', () => {
    const req = {body: {}, session: {loggedIn: true, userId: testUserId}} as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the todo isnt a string', () => {
    const req = {body: {todo: 1, dueDate: 'string', done: false}, session: {loggedIn: true, userId: testUserId}} as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if the date is the wrong format', () => {
    const req = {
      body: {
        todo: 'test todo', 
        dueDate: '21-10-11',
        done: false
      }, 
      session: {
        loggedIn: true, 
        userId: testUserId
      }
    } as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
    });
  });

  test('it 406s if there isnt done in the body', () => {
    const req = {
      body: {
        todo: 'test todo', 
        dueDate: '2021-10-11'
      }, 
      session: {
        loggedIn: true, 
        userId: testUserId
      }
    } as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406)
      expect(err.message).toBe('invalid');
    });
  });

  test('it 406s if body.done is the wrong type', () => {
    const req = {
      body: {
        todo: 'test todo', 
        dueDate: '2021-10-11',
        done: 'hello'
      }, 
      session: {
        loggedIn: true, 
        userId: testUserId
      }
    } as Request;

    return addTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it adds a todo', () => {
    const req = {
      body: {
        todo: 'test todo', 
        dueDate: '2021-10-11',
        done: false
      }, 
      session: {
        loggedIn: true, 
        userId: testUserId
      }
    } as Request;

    return addTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('todo added');
    });
  });

  test('clean up test user', async () => {
    return await deleteUserFromDB('add user test email');
  });
});