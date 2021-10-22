import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import getTodoSteps from "./functions/getTodoSteps";
import validateGetTodoReq from "./functions/validateGetTodoReq";

const getTodoModel = (req: Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => validateGetTodoReq(req))
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