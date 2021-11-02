import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import compareHash from "./functions/compareHash";
import getUserDetails from "./functions/getUserDetails";
import makeHash from "./functions/makeHash";
import updatePasswordInDB from "./functions/updatePasswordInDB";

const updatePasswordModel = (req : Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'Not Authorised'});
    return;
  })
  .then(() => {
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.pword) throw ({status: 406, message: 'no password'});
    if (typeof(req.body.pword) !== 'string') throw ({status: 406, message: 'invalid password'});
    if (!req.body.newPword) throw ({status: 406, message: 'no new password'});
    if (typeof(req.body.newPword) !== 'string') throw ({status: 406, message: 'invalid new password'});
    return;
  })
  .then(() => getUserDetails(conn, req.session.userId))
  .then(user => compareHash(user.pword, req.body.pword))
  .then(pwordMatch => {
    if (pwordMatch === false) throw ({status: 401, message: 'Password Incorrect'});
    return;
  })
  .then(() => makeHash(req.body.newPword))
  .then(newPword => updatePasswordInDB(conn, newPword, req.session.userId))
  .then(() => ({status: 202, message: 'Password Updated'}))
  .finally(() => {
    conn.end();
  });
};

export default updatePasswordModel;