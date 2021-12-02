import { Request } from 'express';
import { TodoWithSteps } from '../../interfaces';
import addTodoModel from '../../models/addTodoModel';
import addTodoStepModel from '../../models/addTodoStepModel';
import addUserModel from '../../models/addUserModel';
import deleteUserFromDB from '../../models/functions/deleteUserFromDB';
import getTodosModel from '../../models/getTodosModel';
import resetTodoModel from '../../models/resetTodoModel';

let testTodos : TodoWithSteps[];

describe('resetTodoModel', () => {

  const req = {
    body: {},
    session: {},
    params: {}
  } as Request;

  const req2 = {
    body: {},
    session: {}
  } as Request;

  test('it creates a test user with todos and steps', () => {
    req.body = {
      email: 'reset todo test',
      name: 'reset todo test',
      pword: 'test'
    }

    return addUserModel(req)
    .then(() => {
      req.body = {
        todo: 'reset todo test',
        dueDate: '2021-12-01',
        done: true
      };
      return addTodoModel(req);
    })
    .then(() => getTodosModel(req))
    .then(resp => {
      testTodos = resp.todos;
      return;
    })
    .then(() => {
      req.params.todoId = String(testTodos[0].id);
      req.body = {
        step: 'reset todo step 1',
        done: true
      }
      return addTodoStepModel(req)
    })
    .then(() => {
      req.body = {
        step: 'reset todo step 2',
        done: false
      };
      return addTodoStepModel(req)
    })
    .then(() => {
      req.body = {
        step: 'reset todo step 3',
        done: true
      };
      return addTodoStepModel(req);
    });
  });

  test('it 401s without a session', () => {
    return resetTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('Not Authorised');
    });
  });

  test('it adds a second user', () => {
    req2.body = {
      name: 'reset todo test 2',
      email: 'reset todo test 2',
      pword: 'test'
    };

    return addUserModel(req2);
  });

  test('it 406s with no params', () => {
    return resetTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no params');
    });
  });

  test('it 406s with no todoid in params', () => {
    req2.params = {};
    return resetTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no todo id');
    });
  });

  test('it 406s with the wrong todoId type', () => {
    req2.params.todoId = 'hello';
    return resetTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid todo id');
    });
  });

  test('it wont update another users todos', () => {
    req2.params.todoId = String(testTodos[0].id);
    return resetTodoModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('it resets the todo and steps', () => {
    req.body = {};
    
    return resetTodoModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('todo reset');
      expect(resp.todo.done).toBeFalsy()
      resp.todo.steps.forEach(step => {
        expect(step.done).toBeFalsy();
      });
    });
  });

  test('it deletes the test user', () => {
    deleteUserFromDB('reset todo test');
    deleteUserFromDB('reset todo test 2');
    return;
  });
});
