import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodosFromDB from "./functions/getTodosFromDB";
import getTodoSteps from './functions/getTodoSteps';

const getTodosModel = (req: Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodosFromDB(conn, req.session.userId))
  .then(todos => Promise.all(todos.map(todo => getTodoSteps(conn, todo))))
  .then(todosWithSteps => ({status: 200, message: 'todos fetched', todos: todosWithSteps}))
  .finally(() => {
    conn.end();
  });
};

export default getTodosModel;