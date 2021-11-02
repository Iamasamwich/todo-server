import { Request } from "express";
import addUserModel from "../../models/addUserModel";
import Conn from "../../models/db";
import compareHash from "../../models/functions/compareHash";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserDetailsByEmail from "../../models/functions/getUserByEmail";
import updateUserModel from "../../models/updateUserModel";

describe('updateUserModel', () => {

  const req = {
    session: {},
    body: {},
    params: {}
  } as Request;

  let initialUserId : string;

  test ('it creates a user for testing', () => {

    const conn = new Conn();

    req.body = {
      name: 'updateUserModel name',
      email: 'updateUserModel email',
      pword: 'updateUserModel pword'
    };
    return addUserModel(req)
    .then(() => getUserDetailsByEmail(conn, 'updateUserModel email'))
    .then(resp => {
      initialUserId = resp.id;
    })
    .finally(() => {
      conn.end();
    });
  });

  test ('it 401s if youre not logged in', () => {
    const req2 = {session : {}} as Request;
    return updateUserModel(req2)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test ('it 406s with no body', () => {
    delete req.body;

    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no body');
    });
  });

  test ('it 406s with no email', () => {
    req.body = {};
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no email');
    });
  });

  test ('it 406s with the wrong email type', () => {
    req.body.email = 1;
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid email');
    });
  });

  test ('it 406s with no name', () => {
    req.body.email = 'updated email test';
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no name');
    });
  });

  test ('it 406s with the wrong name type', () => {
    req.body.name = 1;
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid name');
    });
  });

  test ('it 406s with no password', () => {
    req.body.name = 'updated name test';

    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no password');
    });
  });

  test ('it 406s with an invalid password', () => {
    req.body.pword = 1;
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid password');
    });
  });

  test ('it 401s with the wrong password', () => {
    req.body.pword = 'wrong password';
    return updateUserModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('incorrect password');
    });
  });

  test ('it lets you update the user', () => {
    req.body.pword = 'updateUserModel pword';

    return updateUserModel(req)
    .then(resp => {
      expect(resp.status).toBe(202);
      expect(resp.message).toBe('user updated');
      expect(resp.user).toStrictEqual({
        name: 'updated name test',
        email: 'updated email test'
      });
      expect(req.session.userId).not.toBe(initialUserId);
    });
  });

  test ('the session has been updated', () => {
    const conn = new Conn();
    return getUserDetailsByEmail(conn, 'updated email test')
    .then(user => {
      expect(user.id).toEqual(req.session.userId);
      return compareHash(user.id, 'updated email test')
    })
    .then(bool => {
      expect(bool).toBe(true);
    })
    .finally(() => {
      conn.end();
    });
  });

  test ('it cleans up the tests', async () => {
    await deleteUserFromDB('updated email test');
    return;
  });
});