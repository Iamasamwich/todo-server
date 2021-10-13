import { Request } from "express";
import addTodoModel from "../../models/addTodo.model";
import addUserModel from "../../models/addUser.model";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserDetails from "../../models/functions/getUserDetails";
import getTodosModel from "../../models/getTodos.model";

describe('getTodosModel', ()  => {

  let testUserId : string;

  test('it 401s if the user isnt logged in', () => {
    const req = {} as Request;

    return getTodosModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it creates a test user', () => {
    const req = {
      session: {},
      body: {
        name: 'getTodos test',
        email: 'getTodos test',
        pword: 'test'
      }
    } as Request;

    return addUserModel(req)
    .then(() => getUserDetails('getTodos test'))
    .then(resp => {
      testUserId = resp.id;
    })
  });

  test('it 404s if there are no todos', () => {
    const req = {
      session: {
        loggedIn: true,
        userId: testUserId
      }
    } as Request;

    return getTodosModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('todos not found');
    });
  });

  test('it creates some test todos for the user', () => {
    const req = {
      session: {
        loggedIn: true,
        userId: testUserId
      },
      body: {
        todo: 'getTodos test 1',
        dueDate: '2021-11-01',
        done: false
      }
    } as Request;

    return addTodoModel(req)
    .then(() => {
      req.body = {
        todo: 'getTodos test 2',
        dueDate: '2021-11-02',
        done: true
      };
      return addTodoModel(req);
    });
  });

  test('it gets the todos', () => {
    const req = {
      session: {
        loggedIn: true, 
        userId: testUserId
      }
    } as Request;

    return getTodosModel(req)
    .then(resp => {
      expect(resp).toStrictEqual({
        status: 200,
        message: 'todos fetched',
        todos: [
          {
            id: resp.todos[0].id,
            todo: 'getTodos test 1',
            dueDate: '2021-11-01',
            done: 0,
            steps: []
          },
          {
            id: resp.todos[1].id,
            todo: 'getTodos test 2',
            dueDate: '2021-11-02',
            done: 1,
            steps: []
          }
        ]
      });
    });
  });

  test('clean up tests', async () => {
    return await deleteUserFromDB('getTodos test');
  });
});