import express from "express";
import session from "express-session";
import request from 'supertest';
import addUserModel from "../../models/addUserModel";
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

describe('/ping', () => {
  test('GET /ping returns 200 unknown with no user', async () => {
    const test = await request(app)
    .get('/ping')

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('unknown');
  });

  test('create a user', async () => {
    const test = await request(app)
    .post('/user')
    .send({name: 'ping test', email: 'ping test', pword: 'ping test'});

    const conn = new Conn();

    return getUserDetailsByEmail(conn, 'ping test')
    .then(resp => {
      userId = resp.id;
      loggedIn = true;
      return;
    })
    .finally(() => {
      conn.end();
    });
  });
  
  test('GET /ping return 200 ok when there is a user logged in', async () => {
    const test = await request(app)
    .get('/ping')

    expect(test.status).toBe(200);
    expect(test.body.status).toBe(200);
    expect(test.body.message).toBe('ok');
  });

  test('clean up tests', async () => {
    await deleteUserFromDB('ping test');
    return;
  });
});