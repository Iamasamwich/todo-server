import Conn from "../db";

const deleteStepFromDB = (conn : Conn, stepId : string) => {
  const m = `
    DELETE FROM todoStep
    WHERE id = ?;
  `;
  const p = Number(stepId);

  return conn.send(m, p);
};

export default deleteStepFromDB;