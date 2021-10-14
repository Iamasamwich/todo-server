import { Request } from "express";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodosFromDB from "./functions/getTodosFromDB";
import getTodoSteps from './functions/getTodoSteps';

const getTodosModel = (req: Request) => {
  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodosFromDB(req.session.userId))
  .then(todos => Promise.all(todos.map(todo => getTodoSteps(todo))))
  .then(todosWithSteps => ({status: 200, message: 'todos fetched', todos: todosWithSteps}))
};

export default getTodosModel;