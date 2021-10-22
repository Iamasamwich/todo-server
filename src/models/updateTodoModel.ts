import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import updateTodoInDB from "./functions/updateTodoInDB";
import getTodoFromDB from "./functions/getTodoFromDB";
import validateNewTodoReq from "./functions/validateNewTodoReq";
import getUserDetails from "./functions/getUserDetails";
import { TodoWithSteps } from '../interfaces';

// export interface Todo {
//   userId: string;
//   id: number;
//   todo: string;
//   done: boolean;
//   dueDate: string;
//   steps: {
//     done: boolean;
//     step: string;
//     id: number;
//     todoId: number;
//   }[];
// };

const updateTodoModel = (req : Request) : Promise<{status: number, message: string, todo: TodoWithSteps}> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return;
  })
  .then(() => {
    if (!req.params || !req.params.todoId || isNaN(Number(req.params.todoId))) throw ({status: 406, message: 'invalid'});
    return;
  })
  .then(() => getUserDetails(conn, req.session.userId))
  .then(() => validateNewTodoReq(req))
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