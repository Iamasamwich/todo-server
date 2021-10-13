import { Request } from "express";
import addUserModel from "../../models/addUser.model";
import addUserToDB from "../../models/functions/addUserToDB";
import checkIfUserInDB from "../../models/functions/checkIfUserInDB";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";

describe('/models/functions/addUserToDB', () => {

  test('it will 406 without a valid body', () => {
    const req = {session: {}} as Request;

    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it adds a user to the db', () => {
    const req = {
      body: {
        email: 'test email',
        name: 'test name',
        pword: 'test pword'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('user created');
    });
  });

  test('the user has actually been added', async () => {
    const test = await checkIfUserInDB('test email');
    expect(test).toBe(true);
  });

  test('the user is logged in after creating an account', () => {
    const req = {
      body: {
        email: 'test email 2',
        name: 'test name 2',
        pword: 'test pword 2'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .then(resp => {
      expect(req.session.userId).toBeTruthy();
      expect(req.session.loggedIn).toBe(true);
    });
  });

  test('it wont add the same user twice', () => {
    const req = {
      body: {
        email: 'test email',
        name: 'test name',
        pword: 'test pword'
      },
      session: {}
    } as Request;

    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(409);
      expect(err.message).toBe('user already exists');
    });
  });

  test('getting db to throw an error', () => {
    return addUserToDB({email: 'test email', name: 'test name', pword: 'test pword'})
    .catch(err => {
      expect(err.status).toBe(500);
      expect(err.message).toBe('server error');
    });
  });

  test('it deletes the test user', async () => {
    return deleteUserFromDB('test email')
    .then(res => {
      expect(res.status).toBe(202);
      expect(res.message).toBe('user deleted');
    })
  });

  test('it deletes the other tests', async () => {
    await deleteUserFromDB('test email 2');
    return;
  });
});