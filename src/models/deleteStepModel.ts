import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import deleteStepFromDB from "./functions/deleteStepFromDB";
import getTodoFromDB from "./functions/getTodoFromDB";

const deleteStepModel = (req : Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'invalid'});
    if (!req.params.todoId) throw ({status: 406, message: 'invalid'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid'});
    if (!req.params.stepId) throw ({status: 406, message: 'invalid'});
    if (isNaN(Number(req.params.stepId))) throw ({status: 406, message: 'invalid'});
    return;
  })
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    const step = todo.steps.filter(step => {
      return step.id === Number(req.params.stepId)
    });
    if (step.length === 0) throw ({status: 404, message: 'step not found'});
    return;
  })
  .then(() => deleteStepFromDB(conn, req.params.stepId))
  .then(() => ({status: 202, message: 'step deleted'}))
  .finally(() => {
    conn.end();
  });



};

export default deleteStepModel;