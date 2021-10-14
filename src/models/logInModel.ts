import { Request } from "express";
import Conn from "./db";
import compareHash from "./functions/compareHash";
import logUserIn from "./functions/logUserIn";
import validateLoginUserReq from "./functions/validateLoginUserReq";
import getUserDetailsByEmail from "./functions/getUserByEmail";

const logInModel = (req : Request) => {

  const conn = new Conn();

  let userId : string;

  return validateLoginUserReq(req)
  .then(() => getUserDetailsByEmail(conn, req))
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