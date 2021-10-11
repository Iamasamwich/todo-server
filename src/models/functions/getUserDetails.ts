import Conn from '../db';

interface GetUserDetails {
  id: string;
  email: string;
  name: string;
  pword: string;
};

const getUserDetails = async (email: string): Promise<GetUserDetails> => {
  const conn = new Conn();

  const m = 'select * from user where email=?'
  const p = email;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) {
      throw ({status: 404, message: 'user not found'});
    };
    return resp[0];
  })
  .finally(() => {
    conn.end();
  });
};

export default getUserDetails;