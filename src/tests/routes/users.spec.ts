import express from "express";
import session from "express-session";
import request from 'supertest';
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
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

app.use(express.static('public'));
app.use(routes);

describe('POST /users', () => {

  test('it creates a user', async () => {
    const test = await request(app)
    .post('/user')
    .send({email: 'POST /users email', name: 'POST /users name', pword: 'POST /users pword'})

    expect(test.status).toBe(201);
    expect(test.body.status).toBe(201);
    expect(test.body.message).toBe('user created');
  });

  test('it 409s if the user exists', async () => {
    const test = await request(app)
    .post('/user')
    .send({email: 'POST /users email', name: 'POST /users name', pword: 'POST /users pword'})

    expect(test.status).toBe(409);
    expect(test.body.status).toBe(409);
    expect(test.body.message).toBe('user already exists');
  });

  test('clean up tests', async () => {
    return await deleteUserFromDB('POST /users email');
  });
});

describe('logInUserController', () => {
  test('it creates an account for tests', async () => {
    return await request(app)
    .post('/user')
    .send({email: 'POST /login test', name: 'POST /login test', pword: 'POST /login test'});
  });

  test('it lets you log in', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /login test', pword: 'POST /login test'})

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged in');
  });

  test('it 401s with incorrect credentials', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /login test', pword: 'incorrect'});

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
    return await deleteUserFromDB('POST /login test');
  });
});

describe('logOutUserController', () => {
  test('it lets you log out', async () => {
    const test = await request(app)
    .put('/login');

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged out');
  });
});
