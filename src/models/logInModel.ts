import { Request } from "express";
import Conn from "./db";
import compareHash from "./functions/compareHash";
import logUserIn from "./functions/logUserIn";
import getUserDetailsByEmail from "./functions/getUserByEmail";

const logInModel = (req : Request) => {

  const conn = new Conn();

  let userId : string;

  return Promise.resolve()
  .then(() => {
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.email) throw ({status: 406, message: 'no email'});
    if (typeof(req.body.email) !== 'string') throw ({status: 406, message: 'invalid email'});
    if (!req.body.pword) throw ({status: 406, message: 'no password'});
    if (typeof(req.body.pword) !== 'string') throw ({status: 406, message: 'invalid password'});
    return;
  })
  .then(() => getUserDetailsByEmail(conn, req.body.email))
  .then(user => {
    userId = user.id;
    return compareHash(user.pword, req.body.pword)
  })
  .then(resp => {
    if (!resp) {
      throw ({status: 401, message: 'not authorised'});
    };
    return logUserIn(req, userId);
  })
  .then(() => ({status: 200, message: 'logged in'}))
  .finally(() => {
    conn.end();
  });
};

export default logInModel;