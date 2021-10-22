import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import validateNewTodoReq from "./functions/validateNewTodoReq";
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
  .then(() => validateNewTodoReq(req))
  .then(() => addTodoToDB(conn, req))
  .then(resp => getTodoFromDB(conn, String(resp.insertId)))
  .then(todo => getTodoSteps(conn, todo))
  .then(todo => ({status: 201, message: 'todo added', todo}))
  .finally(() => {
    conn.end();
  });
};

export default addTodoModel;