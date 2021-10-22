import { Request, Response } from "express";
import getTodoModel from "../../models/getTodoModel";

const getTodo = (req : Request, res : Response) => {
  return getTodoModel(req)
  .then(resp => {
    const todoNoUser = {
      id: resp.todo.id,
      todo: resp.todo.todo,
      done: resp.todo.done,
      dueDate: resp.todo.dueDate,
      steps: resp.todo.steps
    };
    return {status: resp.status, message: resp.message, todo: todoNoUser}
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default getTodo;