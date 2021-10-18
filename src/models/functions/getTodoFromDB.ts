import { Request } from "express";
import Conn from "../db";

interface Todo {
  id: number;
  userId: string;
  todo: string;
  done: boolean;
  dueDate: string;
};

const getTodoFromDB = (conn: Conn, req: Request) : Promise<Todo> => {

  const m = "SELECT * FROM todo WHERE id = ?;";
  const p : number = Number(req.params.todoId);

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'todo not found'});
    return resp[0];
  });
};

export default getTodoFromDB;