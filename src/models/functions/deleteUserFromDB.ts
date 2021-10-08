import Conn from '../db';

const deleteUserFromDB = (email: string) => {
  const conn = new Conn();

  const m = "DELETE FROM user WHERE email = ?";
  const p = email;

  return conn.send(m, p)
  .then(() => ({status: 202, message: 'user deleted'}))
  .finally(() => {
    conn.end();
  });
};

export default deleteUserFromDB;