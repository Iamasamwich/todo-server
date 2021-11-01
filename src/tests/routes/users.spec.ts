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

describe('user routes', () => {

  test('it creates a user', async () => {
    const test = await request(app)
    .post('/user')
    .send({email: 'POST /users email', name: 'POST /users name', pword: 'POST /users pword'})

    expect(test.status).toBe(201);
    expect(test.body.status).toBe(201);
    expect(test.body.message).toBe('user created');

    const conn = new Conn();
    return getUserDetailsByEmail(conn, 'POST /users email')
    .then(resp => {
      userId = resp.id;
      loggedIn = true;
      return;
    })
    .finally(() => {
      conn.end();
    });
  });

  test('it 409s if the user exists', async () => {
    const test = await request(app)
    .post('/user')
    .send({email: 'POST /users email', name: 'POST /users name', pword: 'POST /users pword'})

    expect(test.status).toBe(409);
    expect(test.body.status).toBe(409);
    expect(test.body.message).toBe('user already exists');
  });

  test ('it lets you update your password', async () => {
    const test = await request(app)
    .put('/user/password')
    .send({pword: 'POST /users pword', newPword: 'updated Pword'});

    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('Password Updated');
  });

  test('it 406s with out a new pword', async () => {
    const test = await request(app)
    .put('/user/password')
    .send({pword: 'should fail'})

    expect(test.status).toBe(406);
    expect(test.body.status).toBe(406);
    expect(test.body.message).toBe('no new password');
  });

  test('it lets you log out', async () => {
    const test = await request(app)
    .put('/login');

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged out');
  });

  test('it lets you log in', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /users email', pword: 'updated Pword'})

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged in');
  });

  test('it 401s with incorrect credentials', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /users email', pword: 'incorrect'});

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
  });

  test('it 404s with incorrect email', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'incorrect', pword: 'some password'});

    expect(test.status).toBe(404);
    expect(test.body.status).toBe(404);
    expect(test.body.message).toBe('user not found');
  });

  test('clean up test', async () => {
    return await deleteUserFromDB('POST /users email');
  });
});

