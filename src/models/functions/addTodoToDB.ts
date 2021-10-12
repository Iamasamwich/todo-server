import {Request} from 'express';
import convertDateFormat from './convertDateFormat';

import Conn from "../db";

const addTodoToDB = (req : Request) => {
  const conn = new Conn();

  const m = "INSERT INTO todo SET ?";
  const p = {
    todo: req.body.todo,
    userId: req.session.userId,
    dueDate: convertDateFormat(req.body.dueDate),
    done: req.body.done
  };

  return conn.send(m, p)
  .finally(() => {
    conn.end();
  });
};

export default addTodoToDB;