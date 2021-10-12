import { Request } from "express";
import addTodoModel from "./addTodo.model";
import addUserModel from "./addUser.model";
import deleteUserFromDB from "./functions/deleteUserFromDB";
import getTodosFromDB from "./functions/getTodosFromDB";
import getUserDetails from "./functions/getUserDetails";
import updateTodoModel from "./updateTodo.model";

describe('updateTodoModel', () => {

  let testUserId : string;
  let testTodos : Array<{id: number, todo: string, userId: string, done: boolean, dueDate: string}>

  test('it creates a test user with todos', () => {
    const req = {
      body: {
        email: 'update todo test',
        name: 'update todo test', 
        pword: 'test'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .then(() => getUserDetails('update todo test'))
    .then(resp => {
      testUserId = resp.id;
      req.body = {
        todo: 'update todo test',
        dueDate: '2021-1-21',
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
    .then(() => getTodosFromDB(testUserId))
    .then(resp => {
      testTodos = resp;
    });
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


  test('clean up test', async () => {
    return await deleteUserFromDB('update todo test');
  });
});