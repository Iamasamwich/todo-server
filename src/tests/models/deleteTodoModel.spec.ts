import { Request } from "express";
import { TodoWithSteps } from "../../interfaces";
import addTodoModel from "../../models/addTodoModel";
import addUserModel from "../../models/addUserModel";
import deleteTodoModel from "../../models/deleteTodoModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getTodosModel from "../../models/getTodosModel";

describe('deleteTodoModel', () => {

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

  let testTodos = [] as TodoWithSteps[];

  test('create a user with todos', () => {
    req.body = {name: 'deleteTodoModel test', email: 'deleteTodoModel test', pword: 'test'};

    return addUserModel(req)
    .then(() => {
      req.body = {todo: 'deleteTodoModel test', dueDate: '2021-12-01', done: false};

      return addTodoModel(req)
    })
    .then(resp => {
      testTodos.push(resp.todo);
    });
  });

  test ('it 406s with no params', () => {
    const req3 = {
      session: req.session
    } as Request;

    return deleteTodoModel(req3)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid params');
    });
  });

  test ('it 406s with no todoId', () => {
    req.params = {};

    return deleteTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no todoId');
    });
  });

  test('it 401s if the wrong user tries to delete a todo', () => {
    req2.body = {name: 'deleteTodoModel test 2', email: 'deleteTodoModel test 2', pword: 'test'};
    return addUserModel(req2)
    .then(() => {
      req2.params.todoId = String(testTodos[0].id);
      return deleteTodoModel(req2);
    })
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it deletes the todo', () => {
    req.body = {};
    req.params = {
      todoId: String(testTodos[0].id)
    };

    return deleteTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('todo deleted');
      return;
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      expect(resp.todos.length).toBe(0);
    });
  });

  test('it wont delete a nonexistant todo', () => {
    return deleteTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('todo not found');
    });
  });

  test('it 406s without a "number" as todoId in params', () => {
    req.params.todoId = 'hello';
    return deleteTodoModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid todoId');
    });
  });

  test('clean up tests', async () => {
    await deleteUserFromDB('deleteTodoModel test');
    await deleteUserFromDB('deleteTodoModel test 2');
    return;
  });
});