import Conn from "../db";

const checkIfUserIdExists = (id : string | undefined) : Promise<void> => {

  const conn = new Conn();

  const m = "SELECT * FROM user WHERE id=?";
  const p = id;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'user not found'});
    return;
  })
  .finally(() => {
    conn.end();
  });
};

export default checkIfUserIdExists;