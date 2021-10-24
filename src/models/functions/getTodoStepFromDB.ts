import Conn from "../db";
import {Step} from '../../interfaces';


const getTodoStepFromDB = (conn : Conn, stepId: string) : Promise<Step> => {
  const m = 'SELECT * FROM todoStep WHERE id = ?;';
  const p = Number(stepId);

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'step not found'});
    return resp[0];
  });
};

export default getTodoStepFromDB;