import { Request } from 'express';
import Conn from '../db';
import sanitiseString from './sanitiseString';

const addTodoStepToDB = (conn : Conn, req : Request) : Promise<{stepId: number}> => {
  const m = 'INSERT INTO todoStep SET ?;';
  const p = {
    todoId: Number(req.params.todoId),
    step: sanitiseString(req.body.step),
    done: req.body.done
  };
  return conn.send(m, p)
  .then(resp => resp.insertId);
};

export default addTodoStepToDB;