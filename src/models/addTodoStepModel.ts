import { Request } from "express";
import Conn from "./db";
import addTodoStepToDB from "./functions/addTodoStepToDB";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import validateNewTodoStepReq from "./functions/validateNewTodoStepReq";

interface TodoStep {
  todoId: number;
  step: string;
  done: boolean;
};

const addTodoStepModel = (req: Request) => {
  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => validateNewTodoStepReq(req))
  .then(() => getTodoFromDB(req.body.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => addTodoStepToDB(conn, req))
  .then(() => ({status: 201, message: 'todo step added'}))
  .finally(() => {
    conn.end();
  });
};

export default addTodoStepModel;