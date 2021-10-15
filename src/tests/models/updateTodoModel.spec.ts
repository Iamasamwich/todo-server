import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addUserModel from "../../models/addUserModel";
import Conn from "../../models/db";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosFromDB from "../../models/functions/getTodosFromDB";
import getUserDetails from "../../models/functions/getUserDetails";
import getTodosModel from "../../models/getTodosModel";
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

  const req = {
    session: {},
    body: {}
  } as Request;

  const req2 = {
    session: {},
    body: {}
  } as Request;

  const req3 = {} as Request;

  test('it creates a test user with todos', () => {

    req.body = {
      email: 'update todo test',
      name: 'update todo test', 
      pword: 'test'
    };

    return addUserModel(req)
    .then(() => {
      req.body = {
        todo: 'update todo test',
        dueDate: '2021-10-21',
        done: false
      };
      return addTodoModel(req);
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
    });
  });

  test('it creates a second user with todos', () => {
    req2.body = {
      email: 'update todo test 2',
      name: 'update todo test 2', 
      pword: 'test'
    };

    return addUserModel(req2)
    .then(() => {
      req2.body = {
        todo: 'update todo test 2',
        dueDate: '2021-1-21',
        done: false
      };
      return addTodoModel(req2);
    })
    .then(() => getTodosModel(req2))
    .then(resp => {
      testTodos2 = resp.todos;
      return;
    });
  });

  test('it 401s with no session', () => {
    return updateTodoModel(req3)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 406s with no body', () => {
    delete req.body;

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 404s if the todo doesnt exist', () => {
    req.body = {
      id: 1,
      todo: 'test todo update', 
      done: false,
      dueDate: '2021-10-21'
    };

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('todo not found');
    });
  });

  test('it 401s if the todo doesnt belong to the user', () => {
    req.body = {
      id: testTodos2[0].id,
      todo: 'test update should fail',
      dueDate: '2022-11-11',
      done: false
    };

    return updateTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it updates a todo', () => {
    req.body = {
      id: testTodos[0].id,
      todo: 'test user 1 todo 1 updated',
      done: true,
      dueDate: '3000-01-1'
    };

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

  test('it sanitises the todo', () => {
    req.body = {
      id: testTodos[0].id,
      todo: '     test updated todo 123<>?,.   /)(*&^  ',
      done: false,
      dueDate: '2021-11-01'
    };
    return updateTodoModel(req)
    .then(resp => {
      expect(resp.todo.todo).toBe('test updated todo 123,.');
    });
  });

  test('clean up test', async () => {
    await deleteUserFromDB('update todo test');
    await deleteUserFromDB('update todo test 2');
    return;
  });
});