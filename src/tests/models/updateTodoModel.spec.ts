import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addUserModel from "../../models/addUserModel";
import Conn from "../../models/db";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosFromDB from "../../models/functions/getTodosFromDB";
import getUserDetails from "../../models/functions/getUserDetails";
import updateTodoModel from "../../models/updateTodoModel";

describe('updateTodoModel', () => {

  interface Todo {
    id: number;
    todo: string;
    done: boolean;
    dueDate: string;
  }

  let testUserId : string;
  let testTodos : Todo[];

  let testUserId2 : string;
  let testTodos2 : Todo[];

  test('it creates a test user with todos', () => {

    const conn = new Conn();

    const req = {
      body: {
        email: 'update todo test',
        name: 'update todo test', 
        pword: 'test'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .then(() => getUserDetails(conn, 'update todo test'))
    .then(resp => {
      testUserId = resp.id;
      req.body = {
        todo: 'update todo test',
        dueDate: '2021-10-21',
        done: false
      };
      req.session.loggedIn = true;
      req.session.userId = testUserId;
      return;
    })
    .then(() => addTodoModel(req))
    .then(resp => {
      expect(resp.status).toBe(201);
    })
    .then(() => getTodosFromDB(conn, testUserId))
    .then(resp => {
      testTodos = resp;
    })
    .finally(() => conn.end());
  });

  test('it creates a second user with todos', () => {

    const conn = new Conn();

    const req = {
      body: {
        email: 'update todo test 2',
        name: 'update todo test 2', 
        pword: 'test'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .then(() => getUserDetails(conn, 'update todo test 2'))
    .then(resp => {
      testUserId2 = resp.id;
      req.body = {
        todo: 'update todo test 2',
        dueDate: '2021-1-21',
        done: false
      };
      req.session.loggedIn = true;
      req.session.userId = testUserId2;

      return;
    })
    .then(() => addTodoModel(req))
    .then(resp => {
      expect(resp.status).toBe(201);
    })
    .then(() => getTodosFromDB(conn, testUserId2))
    .then(resp => {
      testTodos2 = resp;
    })
    .finally(() => conn.end());
  });

  test('it 401s with no session', () => {
    const req = {} as Request;

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 406s with no body', () => {
    const req = {
      session: {
        userId: testUserId, 
        loggedIn: true
      }
    } as Request;

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 404s if the todo doesnt exist', () => {
    const req = {
      session: {
        userId: testUserId,
        loggedIn: true
      },
      body: {
        id: 1,
        todo: 'test todo update', 
        done: false,
        dueDate: '2021-10-21'
      }
    } as Request;

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('todo not found');
    });
  });

  test('it 401s if the todo doesnt belong to the user', () => {
    const req = {
      session: {
        loggedIn: true,
        userId: testUserId
      },
      body: {
        id: testTodos2[0].id,
        todo: 'test update should fail',
        dueDate: '2022-11-11',
        done: false
      }
    } as Request;

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it updates a todo', () => {
    const req = {
      session: {
        userId: testUserId,
        loggedIn: true
      },
      body: {
        id: testTodos[0].id,
        todo: 'test user 1 todo 1 updated',
        done: true,
        dueDate: '3000-01-1'
      }
    } as Request;

    return updateTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('todo updated');
      expect(resp.todo).toBeTruthy();
      expect(resp.todo.todo).toBe('test user 1 todo 1 updated');
      expect(resp.todo.dueDate).toBe('3000-01-01');
      expect(resp.todo.done).toBeTruthy();
      expect(resp.todo.id).toBe(testTodos[0].id);
    });
  });

  test('clean up test', async () => {
    await deleteUserFromDB('update todo test');
    await deleteUserFromDB('update todo test 2');
    return;
  });
});