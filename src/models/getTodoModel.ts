import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";

const getTodoModel = (req: Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => {
    if (!req.params.todoId) throw ({status: 406, message: 'no todoId'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todoid'});
    return;
  })
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo;
  })
  .then(todo => ({status: 200, message: 'todo fetched', todo}))
  .finally(() => {
    conn.end();
  });
};

export default getTodoModel;