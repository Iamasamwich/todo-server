import { Request } from 'express';
import Conn from '../db';

const addTodoStepToDB = (conn : Conn, req : Request) : Promise<any> => {
  const m = 'INSERT INTO todoStep SET ?;';
  const p = {
    todoId: req.body.todoId,
    step: req.body.step,
    done: req.body.done
  };

  return conn.send(m, p);
};

export default addTodoStepToDB;