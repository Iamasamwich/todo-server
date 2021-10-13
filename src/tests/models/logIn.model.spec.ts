import {Request} from 'express';

import addUserToDB from "../../models/functions/addUserToDB";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import logInModel from "../../models/logIn.model";

describe('logIn.model', () => {

  test('create a test account', async () => {
    return await addUserToDB({email: 'test email', name: 'test name', pword: 'test pword'});
  });

  test('it 406s with an invalid body', () => {
    const req = {
      body: {},
      session: {}
    } as Request;

    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it 404s with an non-existant email', () => {
    const req = {
      body: {
        email: 'incorrect email',
        pword: 'pword'
      },
      session: {}
    } as Request;

    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('user not found');
    });
  });

  test('it 401s with an incorrect password', () => {
    const req = {
      body: {
        email: 'test email',
        pword: 'incorrect pword'
      },
      session: {}
    } as Request;

    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('lets you log in', () => {
    const req = {
      body: {
        email: 'test email',
        pword: 'test pword'
      },
      session: {}
    } as Request;

    return logInModel(req)
    .then(resp => {
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('logged in');
      expect(req.session.userId).toBeTruthy();
      expect(req.session.loggedIn).toBe(true);
    });
  });

  test('clean up the tests', async () => {
    return await deleteUserFromDB('test email');
  });
});