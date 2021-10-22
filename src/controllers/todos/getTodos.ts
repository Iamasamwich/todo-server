import { Request, Response } from "express";
import getTodosModel from "../../models/getTodosModel";

const getTodos = (req : Request, res: Response) => {
  return getTodosModel(req)
  .then(resp => {
    const todosNoUser = resp.todos.map(todo => {
      return {
        id: todo.id,
        todo: todo.todo,
        dueDate: todo.dueDate,
        done: todo.done,
        steps: todo.steps
      };
    });
    return {status: resp.status, message: resp.message, todos: todosNoUser};
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default getTodos;