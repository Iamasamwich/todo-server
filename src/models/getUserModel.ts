import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getUserDetails from "./functions/getUserDetails";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  pword: string;
};

const getUserModel = (req : Request) => {
  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getUserDetails(conn, req))
  .then(resp => ({status: 200, message: 'user fetched', user: resp}))
  .finally(() => {
    conn.end();
  });
};

export default getUserModel;