import Conn from "../db";

const updatePasswordInDB = (conn : Conn, newPword : string, userId : string | undefined) => {
  const m = `
    UPDATE user
    SET pword = ?
    WHERE id = ?
  `;
  const p = [newPword, userId];

  return conn.send(m, p);
};

export default updatePasswordInDB;