import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import addTodoToDB from "./functions/addTodoToDB";
import getUserDetails from "./functions/getUserDetails";
import getTodoFromDB from "./functions/getTodoFromDB";
import getTodoSteps from "./functions/getTodoSteps";
import { TodoWithUser, Step, Res } from '../interfaces';

interface TodoWithSteps extends TodoWithUser {
  steps: Step[]
};
interface AddTodoRes extends Res {
  todo: TodoWithSteps;
};

const addTodoModel = (req : Request) : Promise<AddTodoRes> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return getUserDetails(conn, req.session.userId);
  })
  .then(() => {
    if (!req.body) throw ({status: 406, message: 'invalid body'});
    if (!req.body.todo) throw ({status: 406, message: 'no todo'});
    if (!req.body.dueDate) throw ({status: 406, message: 'no dueDate'});
    if (typeof(req.body.done) !== 'boolean') throw ({status: 406, message: 'invalid done'});
    if (typeof(req.body.todo) !== 'string') throw ({status: 406, message: 'invalid todo'});
    if (!req.body.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) throw ({status: 406, message: 'invalid date'});
    return;
  })
  .then(() => addTodoToDB(conn, req))
  .then(resp => getTodoFromDB(conn, String(resp.insertId)))
  .then(todo => getTodoSteps(conn, todo))
  .then(todo => ({status: 201, message: 'todo added', todo}))
  .finally(() => {
    conn.end();
  });
};

export default addTodoModel;