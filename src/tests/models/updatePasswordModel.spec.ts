import { Request } from "express"
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserModel from "../../models/getUserModel";
import logInModel from "../../models/logInModel";
import updatePasswordModel from "../../models/updatePasswordModel";

describe ('updatePasswordModel', () => {

  const req = {
    session: {},
    body: {},
  } as Request;

  test('it 401s if the user is not logged in', () => {
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('Not Authorised');
    });
  });

  test('it creates a test user', () => {
    req.body = {
      name: 'updatePasswordModel test',
      email: 'updatePasswordModel test',
      pword: 'test'
    };

    return addUserModel(req);
  });

  test ('it 406s with no body', () => {
    delete req.body;
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no body');
    });
  });

  test ('it 406s with no pword', () => {
    req.body = {};
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no password');
    });
  });

  test ('it 406s with a non-string pword', () => {
    req.body.pword = 1;
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid password');
    });
  });

  test ('it 406s with no new password', () => {
    req.body.pword = 'updated';
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no new password');
    });
  });

  test ('it 406s with a non-string new pword', () => {
    req.body.newPword = 1;
    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid new password');
    });
  });

  test ('it 401s if the pwords dont match', () => {
    req.body = {
      pword: 'wrong password',
      newPword: 'updated'
    };

    return updatePasswordModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('Password Incorrect');
    });
  });

  test('you can update the pword', () => {
    req.body = {
      pword: 'test',
      newPword: 'updated'
    };

    return updatePasswordModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('Password Updated');
    });
  });

  test('you can log in with the updated password', () => {
    delete req.session.loggedIn;
    delete req.session.userId;
    req.body = {
      email: 'updatePasswordModel test',
      pword: 'updated'
    };

    return logInModel(req)
    .then(resp => {
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('logged in');
    });
  });

  test('clean up tests', async () => {
    await deleteUserFromDB('updatePasswordModel test');
    return;
  });
});