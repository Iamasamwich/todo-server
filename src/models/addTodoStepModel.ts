import { Request } from "express";
import Conn from "./db";
import addTodoStepToDB from "./functions/addTodoStepToDB";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodoFromDB from "./functions/getTodoFromDB";
import getTodoStepFromDB from './functions/getTodoStepFromDB';

const addTodoStepModel = (req: Request) => {
  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'invalid path'});
    if (!req.params.todoId) throw ({status: 406, message: 'no todoId'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todoId in path'});
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.step) throw ({status: 406, message: 'no step'});
    if (typeof(req.body.step) !== 'string') throw ({status: 406, message: 'invalid step'});
    if (typeof(req.body.done) !== 'boolean') throw ({status: 406, message: 'invalid done'});
    return;
  })
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