import Conn from "../db";

interface User {
  id: string;
  email: string;
  name: string;
  pword: string;
};

const checkIfUserIdExists = (conn : Conn, id : string | undefined) : Promise<void> => {

  const m = "SELECT * FROM user WHERE id=?";
  const p = id;

  return conn.send(m, p)
  .then((resp : User[]) => {
    if (resp.length === 0) throw ({status: 404, message: 'user not found'});
    return;
  });
};

export default checkIfUserIdExists;