import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import deleteTodoFromDB from "./functions/deleteTodoFromDB";
import getTodoFromDB from "./functions/getTodoFromDB";

const deleteTodoModel = (req : Request) : Promise<{status: number, message: string}> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'invalid params'});
    if (!req.params.todoId) throw ({status: 406, message: 'no todoId'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todoId'});
    return;
  })
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo.id;
  })
  .then(todoId => deleteTodoFromDB(conn, todoId))
  .then(() => ({status: 202, message: 'todo deleted'}))
  .finally(() => {
    conn.end();
  });
};

export default deleteTodoModel;