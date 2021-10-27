import { Request } from "express";
import addUserModel from "../../models/addUserModel";
import getUserModel from "../../models/getUserModel";
import Conn from "../../models/db";
import addUserToDB from "../../models/functions/addUserToDB";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";

describe('/models/functions/addUserToDB', () => {

  const req = {
    session: {}
  } as Request;

  const req2 = {
    session: {},
    body: {}
  } as Request;

  test('it will 406 without a valid body', () => {
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no body');
    });
  });

  test ('it 406s with no email', () => {
    req.body = {};
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no email');
    });
  });

  test ('it 406s with the wrong type of email', () => {
    req.body.email = 1;

    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid email');
    });
  });

  test ('it 406s without a name', () => {
    req.body.email = 'addUserModel test';

    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no name');
    });
  });

  test ('it 406s with an invalid name type', () => {
    req.body.name = 1;
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid name');
    });
  })

  test ('it 406s with no pword', () => {
    req.body.name = 'addUserModel test';
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('no password');
    });
  });

  test ('it 406s with the wrong pword type', () => {
    req.body.pword = 1;
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid password');
    });
  });

  test('it adds a user to the db and logs them in', () => {
    req.body =  {
      email: 'test add user email',
      name: 'test name',
      pword: 'test pword'
    };

    return addUserModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('user created');
      expect(req.session).toBeTruthy();
      expect(req.session.userId).toBeTruthy();
      expect(req.session.loggedIn).toBe(true);
      return getUserModel(req)
    })
    .then(resp => {
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('user fetched');
      expect(resp.user.email).toBe('test add user email');
      expect(resp.user.name).toBe('test name');
      expect(resp.user.id).toBe(req.session.userId);
      expect(resp.user.pword).toBeTruthy();
    });
  });

  test('it wont add the same user twice', () => {
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(409);
      expect(err.message).toBe('user already exists');
    });
  });

  test('getting db to throw an error', () => {

    const conn = new Conn();

    const req = {
      body: {
        email: 'test add user email', 
        name: 'test name', 
        pword: 'test pword'
      }
    } as Request;

    return addUserToDB(conn, req)
    .catch(err => {
      expect(err.status).toBe(500);
      expect(err.message).toBe('server error');
    })
    .finally(() => conn.end());
  });

  test('it sanitises the user name', () => {
    req2.body = {
      name: '    test #%^((*&^%$.AddUSER1234567890., ',
      email: 'test add user email 2',
      pword: 'test'
    };

    return addUserModel(req2)
    .then(() => getUserModel(req2))
    .then(resp => {
      expect(resp.user.name).toBe('test .AddUSER1234567890.,');
      expect(resp.user.email).toBe('test add user email 2');
    });
  });

  test('clean up tests', async () => {
    await deleteUserFromDB('test add user email');
    await deleteUserFromDB('test add user email 2');
    return;
  });
});