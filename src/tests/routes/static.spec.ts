import express from "express";
import session from "express-session";
import request from 'supertest';
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

describe('get /', () => {
  test('it gets the home page', async () => {
    const test = await request(app)
    .get('/');
    
    const regex = new RegExp('^<!doctype html>');

    expect(test.headers['content-type']).toBe('text/html; charset=UTF-8');
    expect(regex.test(test.text)).toBe(true);
    return;
  });
});

describe('404', () => {
  test('it returns 404 on an invalid route', async () => {
    const test = await request(app)
    .get('/notarealroute')

    expect(test.status).toBe(404);
    expect(test.body.status).toBe(404);
    expect(test.body.message).toBe('404');
  });
});
