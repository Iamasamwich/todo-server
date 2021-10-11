import Conn from '../db';

const checkIfUserInDB = async (email : string) : Promise<Boolean> => {
  const conn = new Conn();

  const m = 'SELECT * FROM user WHERE email = ?';
  const p = email;

  return conn.send(m, p)
  .then((resp : any) => {
    if (resp.length) {
      return true;
    } else {
      return false;
    };
  })
  .finally(() => {
    conn.end();
  });
};

export default checkIfUserInDB;