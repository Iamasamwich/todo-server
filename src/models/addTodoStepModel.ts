import { Request } from "express";
import Conn from "./db";
import addTodoStepToDB from "./functions/addTodoStepToDB";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import getTodoStepFromDB from './functions/getTodoStepFromDB';
import validateNewTodoStepReq from "./functions/validateNewTodoStepReq";

const addTodoStepModel = (req: Request) => {
  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => validateNewTodoStepReq(req))
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => addTodoStepToDB(conn, req))
  .then(stepId => getTodoStepFromDB(conn, String(stepId)))
  .then(step => ({status: 201, message: 'todo step added', step}))
  .finally(() => {
    conn.end();
  });
};

export default addTodoStepModel;