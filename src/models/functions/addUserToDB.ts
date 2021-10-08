import getHash from './getHash';
import Conn from '../db';

interface User {
  email: string;
  name: string;
  pword: string;
}

const addUserToDB = async (user: User) : Promise<{status: number, message: string}> => {
  const conn = new Conn();

  const hashEmail = await getHash(user.email);
  const hashPword = await getHash(user.pword);

  const m = "INSERT INTO user SET ?";
  const p = {
    id: hashEmail,
    email: user.email,
    name: user.name,
    pword: hashPword
  };

  return conn.send(m, p)
  .then(() => ({status: 201, message: 'user added'}))
  .finally(() => {
    conn.end();
  });
};

export default addUserToDB;