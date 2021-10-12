import {Request} from 'express';

import Conn from "../db";

const addTodoToDB = (req : Request) => {
  const conn = new Conn();

  const m = "INSERT INTO todo SET ?";
  const p = {
    todo: req.body.todo,
    userId: req.session.userId,
    dueDate: req.body.dueDate,
    done: false
  };

  return conn.send(m, p)
  .then(resp => {
    console.log(resp);
    return resp;
  })
  .finally(() => {
    conn.end();
  });
};

export default addTodoToDB;