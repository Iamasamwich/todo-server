import makeHash from './makeHash';
import Conn from '../db';

interface User {
  email: string;
  name: string;
  pword: string;
}

const addUserToDB = async (user: User) : Promise<string> => {
  const conn = new Conn();

  const hashEmail = await makeHash(user.email);
  const hashPword = await makeHash(user.pword);

  const m = "INSERT INTO user SET ?";
  const p = {
    id: hashEmail,
    email: user.email,
    name: user.name,
    pword: hashPword
  };

  return conn.send(m, p)
  .then(() => hashEmail)
  .finally(() => {
    conn.end();
  });
};

export default addUserToDB;