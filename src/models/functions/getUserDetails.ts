import Conn from '../db';
import { UserDetails } from '../../interfaces';

const getUserDetails = async (conn : Conn, userId: string | undefined): Promise<UserDetails> => {

  const m = 'select * from user where id = ?;';
  const p = userId;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) {
      throw ({status: 404, message: 'user not found'});
    };
    return resp[0];
  });
};

export default getUserDetails;