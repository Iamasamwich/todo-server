import {Request} from 'express';
import Conn from './db';
import checkUserIsLoggedIn from './functions/checkUserIsLoggedIn';
import getTodoFromDB from './functions/getTodoFromDB';
import getTodoStepFromDB from './functions/getTodoStepFromDB';
import updateTodoStepInDB from './functions/updateTodoStepInDB';
import validateNewTodoStepReq from './functions/validateNewTodoStepReq';

//params: todoid, stepId


const updateTodoStepModel = (req : Request) : Promise<{status: number, message: string}>=> {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(() => validateNewTodoStepReq(req))
  .then(() => {
    if (!req.params.stepId || isNaN(Number(req.params.stepId))) throw ({status: 406, message: 'invalid'});
    return;
  })
  .then(() => getTodoFromDB(conn, req))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodoStepFromDB(conn, req))
  .then(() => updateTodoStepInDB(conn, req))
  .then(() => ({status: 202, message: 'todo step updated'}))
  .finally(() => {
    conn.end();
  });
};

export default updateTodoStepModel;