import { Request } from "express";
import Conn from "../models/db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getUserDetails from './functions/getUserDetails';
import getUserDetailsByEmail from "./functions/getUserByEmail";
import logUserIn from "./functions/logUserIn";
import updateUserInDB from "./functions/updateUserInDB";
import compareHash from './functions/compareHash';

const updateUserModel = (req : Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => {
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.email) throw({status: 406, message: 'no email'});
    if (typeof(req.body.email) !== 'string') throw ({status: 406, message: 'invalid email'});
    if (!req.body.name) throw ({status: 406, message: 'no name'});
    if (typeof(req.body.name) !== 'string') throw ({status: 406, message: 'invalid name'});
    if (!req.body.pword) throw ({status: 406, message: 'no password'});
    if (typeof(req.body.pword) !== 'string') throw ({status: 406, message: 'invalid password'});
    return;
  })
  .then(() => getUserDetails(conn, req.session.userId))
  .then(user => compareHash(user.pword, req.body.pword))
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'incorrect password'});
    return;
  })
  .then(() => updateUserInDB(conn, req))
  .then(() => getUserDetailsByEmail(conn, req.body.email))
  .then(async resp => {
    await logUserIn(req, resp.id);
    return resp;
  })
  .then(user => {
    return ({
      status: 202,
      message: 'user updated',
      user: {
        email: user.email,
        name: user.name
      }
    });
  })
  .finally(() => {
    conn.end();
  });
};

export default updateUserModel;