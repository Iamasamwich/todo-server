import { Request } from "express";
import checkIfUserIdExists from "./functions/checkIfUserIdExists";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import updateTodoInDB from "./functions/updateTodoInDB";
import getTodoFromDB from "./functions/getTodoFromDB";
import validateNewTodoReq from "./functions/validateNewTodoReq";

interface Todo {
  id: number;
  userId: string;
  todo: string;
  done: boolean;
  dueDate: string;
}

const updateTodoModel = (req : Request) : Promise<{status: number, message: string}> => {

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return;
  })
  .then(() => checkIfUserIdExists(req.session.userId))
  .then(() => validateNewTodoReq(req))
  .then(() => getTodoFromDB(req.body.id))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo;
  })
  .then((todo : Todo) => updateTodoInDB(todo, req.body))
  .then(() => ({status: 201, message: 'todo updated'}));
};

export default updateTodoModel;