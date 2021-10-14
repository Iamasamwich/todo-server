import { Request } from "express";
import Conn from "./db";
import getUserDetails from "./functions/getUserDetails";
import compareHash from "./functions/compareHash";
import logUserIn from "./functions/logUserIn";
import validateLoginUserReq from "./functions/validateLoginUserReq";

const logInModel = (req : Request) => {

  const conn = new Conn();

  let userId : string;

  return validateLoginUserReq(req)
  .then(() => getUserDetails(conn, req.body.email))
  .then(resp => {
    userId = resp.id;
    return resp;
  })
  .then(user => compareHash(user.pword, req.body.pword))
  .then(resp => {
    if (!resp) {
      throw ({status: 401, message: 'not authorised'});
    };
    return;
  })
  .then(() => logUserIn(req, userId))
  .then(() => ({status: 200, message: 'logged in'}))
  .finally(() => {
    conn.end();
  })
};

export default logInModel;