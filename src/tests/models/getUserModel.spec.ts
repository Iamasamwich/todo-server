import { Request } from "express";
import addUserModel from "../../models/addUserModel";
import deleteUserFromDB from "../../models/functions/deleteUserFromDB";
import getUserModel from "../../models/getUserModel"

describe('getUserModel', () => {

  const req = {session: {}, body: {}} as Request;

  test('it 401s if the user is not logged in', () => {
    return getUserModel(req)
    .catch(err => {
      expect(err.status).toBe(401);
      expect(err.message).toBe('not authorised');
    });
  });

  test('create a test user', () => {

    req.body = {email: 'test getuser', name: 'test getuser', pword: 'test'};

    return addUserModel(req)
  });

  test('it gets the users details', () => {
    getUserModel(req)
    .then(resp => {
      expect(resp.status).toBe(200);
      expect(resp.message).toBe('user fetched');
      expect(resp.user.id).toBeTruthy();
      expect(resp.user.id).toBe(req.session.userId);
      expect(resp.user.email).toBe('test getuser');
      expect(resp.user.name).toBe('test getuser');
      expect(resp.user.pword).toBeTruthy();
      expect(resp.user.pword).not.toBe('test');
    });
  });

  test('clean up tests', () => {
    return deleteUserFromDB('test getuser');
  })
});