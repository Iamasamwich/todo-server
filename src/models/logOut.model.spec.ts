import { Request } from "express";
import logOutModel from "./logOut.model";

describe('logOutModel', () => {
  test('it logs the user out', () => {
    const req = {
      session: {
        userId: 'test user id',
        loggedIn: true
      }
    } as Request;

    return logOutModel(req)
    .then(() => {
      expect(req.session.loggedIn).toBe(false);
      expect(req.session.userId).toBeUndefined();
    });
  });
});