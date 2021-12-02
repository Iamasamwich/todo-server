import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import getUserDetails from "./functions/getUserDetails";
import resetTodo from "./functions/resetTodo";

const resetTodoModel = (req : Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'Not Authorised'});
    return;
  })
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'no params'});
    if (!req.params.todoId) throw ({status: 406, message: 'no todo id'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todo id'});
    return;
  })
  .then(() => getUserDetails(conn, req.session.userId))
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo;
  })
  .then(todo => resetTodo(conn, todo))
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => ({status: 202, message: 'todo reset', todo}))
  .finally(() => {
    conn.end();
  });
};

export default resetTodoModel;