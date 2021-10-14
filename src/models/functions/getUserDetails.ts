import { Request } from 'express';
import Conn from '../db';

interface GetUserDetails {
  id: string;
  email: string;
  name: string;
  pword: string;
};

const getUserDetails = async (conn : Conn, req : Request): Promise<GetUserDetails> => {

  const m = 'select * from user where id = ?;';
  const p = req.session.userId;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) {
      throw ({status: 404, message: 'user not found'});
    };
    return resp[0];
  });
};

export default getUserDetails;