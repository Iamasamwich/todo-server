import Conn from "../db";
import getTodoSteps from "./getTodoSteps";
import { TodoWithUser, Step } from '../../interfaces';

interface TodoWithSteps extends TodoWithUser {
  steps: Step[];
};

const getTodosFromDB = (conn: Conn, userId : string | undefined) : Promise<TodoWithSteps[]> => {

  const m = "SELECT * FROM todo WHERE userId = ?;";
  const p = userId;

  return conn.send(m, p)
  .then((todos : TodoWithUser[]) => {
    return Promise.all(todos.map(todo => {
      return getTodoSteps(conn, todo);
    }));
  });
};

export default getTodosFromDB;