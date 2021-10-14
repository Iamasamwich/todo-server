import { Request } from "express";
import Conn from "../db";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  pword: string;
};

const getUserDetailsByEmail = (conn : Conn, req : Request) : Promise<UserDetails> => {

  const m = 'SELECT * FROM user WHERE email = ?;';
  const p = req.body.email;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'user not found'});
    return resp[0];
  });
};

export default getUserDetailsByEmail;