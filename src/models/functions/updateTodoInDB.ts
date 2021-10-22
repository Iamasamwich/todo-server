import { Request } from "express";
import Conn from "../db";
import convertDateFormat from "./convertDateFormat";
import sanitiseString from "./sanitiseString";
import { TodoWithUser } from '../../interfaces';

const updateTodoInDB = (conn : Conn, todo: TodoWithUser, req : Request) => {

  const m = `
    UPDATE todo
    SET ?
    WHERE id = ?;
  `;
  const p = [
    {
      done: req.body.done,
      todo: sanitiseString(req.body.todo),
      dueDate: convertDateFormat(req.body.dueDate)
    },
    todo.id
  ];

  return conn.send(m, p);
};

export default updateTodoInDB;