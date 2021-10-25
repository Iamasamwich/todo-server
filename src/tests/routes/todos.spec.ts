import express from "express";
import session from "express-session";
import request from 'supertest';
import Conn from "../../models/db";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserDetailsByEmail from "../../models/functions/getUserByEmail";
import routes from "../../routes";

const app = express();

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    loggedIn?: boolean;
  }
};

app.use(express.json());

app.use(session({
  secret: 'backflips are for crickets',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 12096000000
  }
}));

let userId: string;
let loggedIn: boolean;

app.use((req, res, next) => {
  req.session.userId = userId;
  req.session.loggedIn = loggedIn;
  next();
});

app.use(express.static('public'));
app.use(routes);

describe('POST /todo', () => {

  let testTodos : any;

  test('it creates a user', async () => {
    const test = await request(app)
    .post('/user')
    .send({
      name: 'POST /todo test', 
      email: 'POST /todo test', 
      pword: 'test'
    });

    expect(test.status).toBe(201);

    const conn = new Conn();
    return getUserDetailsByEmail(conn, 'POST /todo test')
    .then(resp => {
      userId = resp.id;
      loggedIn = true;
      return;
    })
    .finally(() => {
      conn.end();
    });
  });

  test('it lets you add a todo', async () => {
    const test = await request(app)
    .post('/todo')
    .send({todo: 'POST /todo test', done: false, dueDate: '2021-12-01'})

    expect(test.status).toBe(201);
    expect(test.body.status).toBe(201);
    expect(test.body.message).toBe('todo added');
    expect(test.body.todo.id).toBeTruthy();
    expect(test.body.todo.userId).toBeFalsy();
    expect(test.body.todo.todo).toBe('POST todo test');
    expect(test.body.todo.dueDate).toBe('2021-12-01');
    expect(test.body.todo.done).toBeFalsy();
    expect(test.body.todo.steps).toStrictEqual([]);
    return;
  });

  test('it lets you add a second todo', async () => {
    await request(app)
    .post('/todo')
    .send({todo: 'POST /todo test 2', done: false, dueDate: '2022-01-11'});

    return;
  })

  test('it 406s without the right details in body', async () => {
    const test = await request(app)
    .post('/todo')
    .send({todo: 'this should fail', dueDate: '2021-11-12'});

    expect(test.status).toBe(406);
    expect(test.body.status).toBe(406);
    expect(test.body.message).toBe('invalid');
    return;
  });

  test('it gets a list of todos', async () => {
    const test = await request(app)
    .get('/todo')

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('todos fetched');
    expect(test.body.todos[0].todo).toBe('POST todo test');
    expect(test.body.todos[0].done).toBeFalsy();
    expect(test.body.todos[0].dueDate).toBe('2021-12-01');
    expect(test.body.todos[0].userId).toBeFalsy();
    expect(test.body.todos[0].steps).toStrictEqual([]);
    expect(test.body.todos[1].todo).toBe('POST todo test 2');
    expect(test.body.todos[1].done).toBeFalsy();
    expect(test.body.todos[1].dueDate).toBe('2022-01-11');
    expect(test.body.todos[1].userId).toBeFalsy();
    expect(test.body.todos[1].steps).toStrictEqual([]);

    testTodos = test.body.todos;
    return;
  });

  test('it lets you update a todo', async () => {
    const todoId = String(testTodos[0].id);
    const test = await request(app)
    .put('/todo/' + String(testTodos[0].id))
    .send({todo: 'updated post todo test', done: true, dueDate: '2022-12-01'});

    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('todo updated');
    expect(test.body.todo.userId).toBeFalsy();
    expect(test.body.todo.todo).toBe('updated post todo test')
    expect(test.body.todo.done).toBeTruthy();
    expect(test.body.todo.dueDate).toBe('2022-12-01');
    expect(test.body.todo.steps).toStrictEqual([]);
    return;
  });

  test('GET /todo/id will get a single todo', async () => {
    const test = await request(app)
    .get('/todo/' + testTodos[0].id);

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('todo fetched');
    expect(test.body.todo).toStrictEqual({
      id: testTodos[0].id,
      todo: 'updated post todo test',
      dueDate: '2022-12-01',
      done: 1,
      steps: []
    });

    return;
  });

  test('DELETE /todo/id will delete a todo', async () => {
    const test = await request(app)
    .delete(`/todo/${String(testTodos[1].id)}`);

    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('todo deleted');

    const test2 = await request(app)
    .get('/todo');

    expect(test2.body.todos.length).toBe(1);
    expect(test2.body.todos[0].id).toBe(testTodos[0].id);
    return;
  });

  test('DELETE /todo/id will catch an error', async () => {
    const test = await request(app)
    .delete(`/todo/${String(testTodos[1].id)}`)
    
    expect(test.status).toBe(404);
    expect(test.body.status).toBe(404);
    expect(test.body.message).toBe('todo not found');
  });

  test('GET /todo/id will 401 if user isnt logged in', async () => {
    userId = '';
    loggedIn = false;

    const test = await request(app)
    .get('/todo/' + testTodos[0].id);

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  });

  test('PUT /todo/id will 401 if the user isnt logged in', async () => {

    const test = await request(app)
    .put('/todo/' + String(testTodos[0].id))
    .send({todo: 'this should fail', dueDate: '2000-01-01', done: true});

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  });

  test('GET /todo will 401s if the user isnt logged in', async () => {
    const test = await request(app)
    .get('/todo')

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  });

  test('clean up tests', async () => {
    await deleteUserFromDB('POST /todo test');
  });
});