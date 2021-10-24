import {Request} from 'express';
import Conn from './db';
import checkUserIsLoggedIn from './functions/checkUserIsLoggedIn';
import getTodoFromDB from './functions/getTodoFromDB';
import getTodoStepFromDB from './functions/getTodoStepFromDB';
import updateTodoStepInDB from './functions/updateTodoStepInDB';
import validateNewTodoStepReq from './functions/validateNewTodoStepReq';
import { Step } from '../interfaces';

const updateTodoStepModel = (req : Request) : Promise<{status: number, message: string, step: Step}>=> {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(() => validateNewTodoStepReq(req))
  .then(() => {
    if (!req.params.stepId || isNaN(Number(req.params.stepId))) throw ({status: 406, message: 'invalid'});
    return;
  })
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodoStepFromDB(conn, req.params.stepId))
  .then(() => updateTodoStepInDB(conn, req))
  .then(() => getTodoStepFromDB(conn, req.params.stepId))
  .then(step => ({status: 202, message: 'todo step updated', step}))
  .finally(() => {
    conn.end();
  });
};

export default updateTodoStepModel;