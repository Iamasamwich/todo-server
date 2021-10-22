import Conn from "../db";

const getTodoStepFromDB = (conn : Conn, stepId: string) : Promise<any> => {
  const m = 'SELECT * FROM todoStep WHERE id = ?;';
  const p = Number(stepId);

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'step not found'});
    return resp;
  });
};

export default getTodoStepFromDB;