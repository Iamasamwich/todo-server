import { Request } from "express";
import addUserModel from "./addUser.model";
import addUserToDB from "./functions/addUserToDB";
import deleteUserFromDB from "./functions/deleteUserFromDB";
import getHash from "./functions/getHash";

const user = {
  body: {
    user: {
      email: 'test email',
      name: 'test name',
      pword: 'test pword'
    }
  }
} as Request;

describe('/models/functions/addUserToDB', () => {
  test('it adds a user to the db', () => {

    return addUserModel(user)
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.message).toBe('user added');
    });
  });

  test('it wont add the same user twice', () => {
    return addUserModel(user)
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
  })

  test('it deletes the test user', async () => {
    return deleteUserFromDB('test email')
    .then(res => {
      expect(res.status).toBe(202);
      expect(res.message).toBe('user deleted');
    })
  });
});