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

  test('it will 406 without a valid body', () => {
    return addUserModel(req)
    .catch(err => {
      expect(err.status).toBe(406);
      expect(err.message).toBe('invalid');
    });
  });

  test('it adds a user to the db', () => {
    req.body =  {
      email: 'test email',
      name: 'test name',
      pword: 'test pword'
    };

    return addUserModel(req)
    .then(resp => {
      expect(resp.status).toBe(201);
      expect(resp.message).toBe('user created');
    });
  });

  test('the user has been added and logged in', () => {
    return getUserModel(req)
    .then(resp => {
      expect(req.session.loggedIn).toBe(true);
      expect(req.session.userId).toBeTruthy();
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('user fetched');
      expect(resp.user.email).toBe('test email');
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
        email: 'test email', 
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

  test('it deletes the test user', async () => {
    return await deleteUserFromDB('test email');
  });
});