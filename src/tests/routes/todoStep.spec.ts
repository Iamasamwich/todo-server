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


describe('todoStep routes', () => {

  let testTodos: any;

  test('it creates a test user', async () => {
    const test = await request(app)
    .post('/user')
    .send({email: 'todostep test user', name: 'todostep test user', pword: 'test'});

    expect(test.status).toBe(201);

    const conn = new Conn();
    return getUserDetailsByEmail(conn, 'todostep test user')
    .then(resp => {
      userId = resp.id;
      loggedIn = true;
    })
    .finally(() => {
      conn.end();
    });
  });

  test('it creates a todo for the user', async () => {
    return await request(app)
    .post('/todo')
    .send({
      todo: 'todostep test todo',
      done: false,
      dueDate: '2021-12-01'
    });
  });

  test('it gets the todos', async () => {
    const test = await request(app)
    .get('/todo')

    testTodos = test.body.todos;
    return;
  });

  test('it lets you add a step', async () => {
    const test = await request(app)
    .post('/todo/' + String(testTodos[0].id) + '/step')
    .send({
      step: 'todostep test step',
      done: false
    });

    expect(test.status).toBe(201);
    expect(test.body.status).toBe(201);
    expect(test.body.message).toBe('todo step added');
    return;
  });

  test('when you get the todos the step is there', async () => {
    const test = await request(app)
    .get('/todo');

    expect(test.body.todos[0].steps.length).toBe(1);
    expect(test.body.todos[0].steps[0].step).toBe('todostep test step');
    expect(test.body.todos[0].steps[0].done).toBeFalsy();
    testTodos = test.body.todos;
    return;
  });

  test('add step 406s without a valid body', async () => {
    const test = await request(app)
    .post('/todo/' + String(testTodos[0].id) + '/step')
    .send({todo: 'this should not work'});

    expect(test.status).toBe(406);
    expect(test.body.status).toBe(406);
    expect(test.body.message).toBe('invalid');
    return;
  });

  test('you can update a step', async () => {
    const test = await request(app)
    .put('/todo/' + String(testTodos[0].id + '/step/' + String(testTodos[0].steps[0].id)))
    .send({step: 'updated todo step', done: true});

    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('todo step updated');
    return;
  });

  test('updateStep 401s without a valid user', async () => {
    loggedIn = false;
    userId = '';

    const test = await request(app)
    .put('/todo/' + String(testTodos[0].id + '/step/' + String(testTodos[0].steps[0].id)))
    .send({step: 'this shouldnt work', done: true});

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  })

  test('clean up tests', () => {
    return deleteUserFromDB('todostep test user');
  });
});