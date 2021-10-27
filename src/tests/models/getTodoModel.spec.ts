import { Request } from "express";
import addTodoModel from "../../models/addTodoModel";
import addTodoStepModel from "../../models/addTodoStepModel";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodoModel from "../../models/getTodoModel";
import getTodosModel from "../../models/getTodosModel";

describe('getTodoModel', () => {

  const req = {
    session: {},
    params: {},
    body: {}
  } as Request;

  const req2 = {
    session: {},
    params: {},
    body: {}
  } as Request;

  let testTodos : any;

  test('it creates a user with todos', () => {
    req.body = {
      email: 'getTodoModel test',
      name: 'getTodoModel test', 
      pword: 'test'
    };
    return addUserModel(req)
    .then(() => {
      req.body = {
        todo: 'getTodoModel test todo',
        done: false,
        dueDate: '2021-11-01'
      };
      return addTodoModel(req)
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
      req.params = {
        todoId: testTodos[0].id
      };
      req.body = {
        step: 'getTodoModel test step',
        done: false
      };
      return addTodoStepModel(req);
    });
  });

  test('it gets the todo', () => {
    req.body = {};
    req.params = {
      todoId: testTodos[0].id
    };

    return getTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('todo fetched');
      expect(resp.todo.id).toBe(testTodos[0].id);
      expect(resp.todo.userId).toBe(req.session.userId);
      expect(resp.todo.done).toBeFalsy();
      expect(resp.todo.todo).toBe('getTodoModel test todo');
      expect(resp.todo.dueDate).toBe('2021-11-01');
      expect(resp.todo.steps.length).toBe(1);
      expect(resp.todo.steps[0].step).toBe('getTodoModel test step');
      expect(resp.todo.steps[0].done).toBeFalsy();
      expect(resp.todo.steps[0].todoId).toBe(testTodos[0].id);
    });
  });

  test('it 401s without user logged in', () => {
    return getTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 401s if the user doesnt match the userId of the todo', () => {
    req2.session.userId = 'hello';
    req2.session.loggedIn = true;
    req2.params.todoId = testTodos[0].id;
    return getTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it 406s without a todoId in params', () => {
    req.params = {};
    return getTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no todoId');
    });
  });


  test('clean up tests', async () => {
    await deleteUserFromDB('getTodoModel test');
    return;
  });
});