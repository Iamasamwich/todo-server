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

  test ('get /user returns 401 if not logged in', async () => {
    const test = await request(app)
    .get('/user');

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  });

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
    return;
  });

  test ('it lets you update your password', async () => {
    const test = await request(app)
    .put('/user/password')
    .send({pword: 'POST /users pword', newPword: 'updated Pword'});

    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('Password Updated');
    return;
  });

  test('it 406s with out a new pword', async () => {
    const test = await request(app)
    .put('/user/password')
    .send({pword: 'should fail'})

    expect(test.status).toBe(406);
    expect(test.body.status).toBe(406);
    expect(test.body.message).toBe('no new password');
    return;
  });

  test('it lets you log out', async () => {
    const test = await request(app)
    .put('/login');

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged out');
    return;
  });

  test('it lets you log in', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /users email', pword: 'updated Pword'})

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('logged in');
    return;
  });

  test('it lets you get your own details', async () => {
    const test = await request(app)
    .get('/user')

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('user fetched');
    expect(test.body.user).toBeTruthy();
    expect(test.body.user.email).toBe('POST /users email');
    expect(test.body.user.name).toBe('POST users name');
    expect(test.body.user.id).toBeFalsy();
    expect(test.body.user.pword).toBeFalsy();
    return;
  });

  test('it 401s with incorrect credentials', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'POST /users email', pword: 'incorrect'});

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('not authorised');
    return;
  });

  test('it 404s with incorrect email', async () => {
    const test = await request(app)
    .post('/login')
    .send({email: 'incorrect', pword: 'some password'});

    expect(test.status).toBe(404);
    expect(test.body.status).toBe(404);
    expect(test.body.message).toBe('user not found');
    return;
  });

  test ('it lets you update your details', async () => {

    const conn = new Conn();
    
    const test = await request(app)
    .put('/user')
    .send({name: 'updated name', email: 'updated email', pword: 'updated Pword'});
    expect(test.status).toBe(202);
    expect(test.body.status).toBe(202);
    expect(test.body.message).toBe('user updated');

    return getUserDetailsByEmail(conn, 'updated email')
    .then(resp => {
      userId = resp.id;
    })
    .finally(() => {
      conn.end();
    });
  });

  test ('update 401s with the wrong password', async () => {
    const test = await request(app)
    .put('/user')
    .send({name: 'updated name', email: 'updated email', pword: 'wrong pword'});

    expect(test.status).toBe(401);
    expect(test.body.status).toBe(401);
    expect(test.body.message).toBe('incorrect password');
    return;
  });

  test('clean up test', async () => {
    return await deleteUserFromDB('updated email');
  });
});

