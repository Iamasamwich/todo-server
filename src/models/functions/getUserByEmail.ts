import Conn from "../db";
import { UserDetails } from '../../interfaces';

const getUserDetailsByEmail = (conn : Conn, email : string) : Promise<UserDetails> => {

  const m = 'SELECT * FROM user WHERE email = ?;';
  const p = email;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'user not found'});
    return resp[0];
  });
};

export default getUserDetailsByEmail;