import {Request} from 'express';
import Conn from './db';
import checkUserIsLoggedIn from './functions/checkUserIsLoggedIn';
import getTodoFromDB from './functions/getTodoFromDB';
import getTodoStepFromDB from './functions/getTodoStepFromDB';
import updateTodoStepInDB from './functions/updateTodoStepInDB';
import { Step } from '../interfaces';

const updateTodoStepModel = (req : Request) : Promise<{status: number, message: string, step: Step}>=> {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'no params'});
    if (!req.params.todoId) throw ({status: 406, message: 'no todoid'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todoid'});
    if (!req.params.stepId) throw ({status:  406, message: 'no stepid'});
    if (isNaN(Number(req.params.stepId))) throw ({status: 406, message: 'invalid stepid'});
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.step) throw ({status: 406, message: 'no step'});
    if (typeof(req.body.step) !== 'string') throw ({status: 406, message: 'invalid step'});
    if (typeof(req.body.done) !== 'boolean')throw ({status: 406, message: 'invalid done'});
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