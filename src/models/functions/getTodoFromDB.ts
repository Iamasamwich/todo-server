import Conn from "../db";
import getTodoSteps from "./getTodoSteps";
import {TodoWithUser, Step} from '../../interfaces'; 

interface TodoWithSteps extends TodoWithUser {
  steps: Step[];
};

const getTodoFromDB = (conn: Conn, todoId: string) : Promise<TodoWithSteps> => {

  const m = "SELECT * FROM todo WHERE id = ?;";
  const p : number = Number(todoId);

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'todo not found'});
    return getTodoSteps(conn, resp[0]);
  });
};

export default getTodoFromDB;