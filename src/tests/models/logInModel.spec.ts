import {Request} from 'express';
import addUserModel from '../../models/addUserModel';
import logInModel from "../../models/logInModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";

describe('logInModel', () => {

  const req = {body: {}, session: {}} as Request;

  test('create a test account', async () => {
    req.body = {
      email: 'test email', name: 'test name', pword: 'test pword'
    };
    
    return await addUserModel(req);
  });

  test('it 406s with an invalid body', () => {
    delete req.session.userId;
    delete req.session.loggedIn;
    delete req.body;
    
    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no body');
    });
  });

  test('it 404s with an non-existant email', () => {
    req.body = {
      email: 'incorrect email',
      pword: 'pword'
    };

    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(404);
      expect(err.message).toBe('user not found');
    });
  });

  test('it 401s with an incorrect password', () => {
    req.body = {
      email: 'test email',
      pword: 'incorrect pword'
    };

    return logInModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('lets you log in', () => {
    req.body = {
      email: 'test email',
      pword: 'test pword'
    };

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