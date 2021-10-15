import {Request} from 'express';
import convertDateFormat from './convertDateFormat';
import Conn from '../db';
import sanitiseString from './sanitiseString';

const addTodoToDB = (conn : Conn, req : Request) => {

  const m = "INSERT INTO todo SET ?";
  const p = {
    todo: sanitiseString(req.body.todo),
    userId: req.session.userId,
    dueDate: convertDateFormat(req.body.dueDate),
    done: req.body.done
  };

  return conn.send(m, p);
};

export default addTodoToDB;