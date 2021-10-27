import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import updateTodoInDB from "./functions/updateTodoInDB";
import getTodoFromDB from "./functions/getTodoFromDB";
import getUserDetails from "./functions/getUserDetails";
import { TodoWithSteps } from '../interfaces';

const updateTodoModel = (req : Request) : Promise<{status: number, message: string, todo: TodoWithSteps}> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return;
  })
  .then(() => {
    if (!req.params) throw ({status: 406, message: 'no params'});
    if (!req.params.todoId) throw ({status: 406, message: 'no todoid'});
    if (isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid todoid'});
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.todo) throw ({status: 406, message: 'no todo'});
    if (!req.body.dueDate) throw ({status: 406, message: 'no dueDate'});
    if (typeof(req.body.done) !== 'boolean') throw ({status: 406, message: 'invalid done'});
    if (typeof(req.body.todo) !== 'string') throw ({status: 406, message: 'invalid todo'});
    if (!req.body.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) throw ({status: 406, message: 'invalid duedate'});
    return;
  })
  .then(() => getUserDetails(conn, req.session.userId))
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo;
  })
  .then(todo => updateTodoInDB(conn, todo, req))
  .then(() => getTodoFromDB(conn, req.params.todoId))
  .then(todo => ({status: 202, message: 'todo updated', todo}))
  .finally(() => {
    conn.end();
  });
};

export default updateTodoModel;