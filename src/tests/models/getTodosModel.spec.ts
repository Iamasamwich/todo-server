import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addUserModel from "../../models/addUserModel";
import getTodosModel from "../../models/getTodosModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";

describe('getTodosModel', ()  => {

  let testUserId : string;

  const req = {body: {}, session: {}} as Request;

  test('it 401s if the user isnt logged in', () => {
    return getTodosModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it creates a test user', () => {
    req.body = {
      name: 'getTodos test',
      email: 'getTodos test',
      pword: 'test'
    }
    return addUserModel(req);
  });

  test('it 404s if there are no todos', () => {
    return getTodosModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('todos not found');
    });
  });

  test('it creates some test todos for the user', () => {
    req.body = {
      todo: 'getTodos test 1',
      dueDate: '2021-11-01',
      done: false
    };

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
    delete req.body;

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