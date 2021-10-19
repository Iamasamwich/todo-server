import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import getTodoSteps from "./functions/getTodoSteps";
import validateGetTodoReq from "./functions/validateGetTodoReq";

interface TodoNoUser {
  id: number,
  todo: string,
  dueDate: string,
  done: boolean
};

const getTodoModel = (req: Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => validateGetTodoReq(req))
  .then(() => getTodoFromDB(conn, req))
  .then((todo) => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    const todoNoUser : TodoNoUser = {
      id: todo.id,
      todo: todo.todo,
      dueDate: todo.dueDate,
      done: todo.done
    };
    return todoNoUser;
  })
  .then(todo => getTodoSteps(conn, todo))
  .then(todo => ({status: 200, message: 'todo fetched', todo}))
  .finally(() => {
    conn.end();
  });
};

export default getTodoModel;