import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import updateTodoInDB from "./functions/updateTodoInDB";
import getTodoFromDB from "./functions/getTodoFromDB";
import validateNewTodoReq from "./functions/validateNewTodoReq";
import getUserDetails from "./functions/getUserDetails";

interface Todo {
  id: number;
  todo: string;
  done: boolean;
  dueDate: string;
}
interface FullTodo extends Todo {
  userId: string;
}

const updateTodoModel = (req : Request) : Promise<{status: number, message: string, todo: Todo}> => {

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
  .then(() => getUserDetails(conn, req))
  .then(() => validateNewTodoReq(req))
  .then(() => getTodoFromDB(conn, req))
  .then(todo => {
    if (todo.userId !== req.session.userId) throw ({status: 401, message: 'not authorised'});
    return todo;
  })
  .then((todo : FullTodo) => updateTodoInDB(conn, todo, req))
  .then(() => getTodoFromDB(conn, req))
  .then(todo => {
    const newTodo : Todo = {
      id: todo.id,
      todo: todo.todo,
      dueDate: todo.dueDate,
      done: todo.done
    };
    return newTodo;
  })
  .then(todo => ({status: 201, message: 'todo updated', todo}))
  .finally(() => {
    conn.end();
  });
};

export default updateTodoModel;