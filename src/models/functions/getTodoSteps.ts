import Conn from '../db';
import { TodoWithUser, Step } from '../../interfaces';

interface TodoWithSteps extends TodoWithUser {
  steps: Step[];
};

const getTodoSteps = (conn : Conn, todo : TodoWithUser) : Promise<TodoWithSteps> => {

  const m = 'SELECT * FROM todoStep WHERE todoId = ?;';
  const p = todo.id;

  return conn.send(m, p)
  .then(steps => {
    return {...todo, steps};
  });
};

export default getTodoSteps;