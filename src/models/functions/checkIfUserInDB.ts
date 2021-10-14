import Conn from '../db';

const checkIfUserInDB = async (conn : Conn, email : string) : Promise<Boolean> => {

  const m = 'SELECT * FROM user WHERE email = ?';
  const p = email;

  return conn.send(m, p)
  .then((resp : any) => {
    if (resp.length) {
      return true;
    } else {
      return false;
    };
  });
};

export default checkIfUserInDB;