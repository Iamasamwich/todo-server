import { Request, Response } from "express";
import resetTodoModel from "../../models/resetTodoModel";

const resetTodo = (req : Request, res : Response) => {

  return resetTodoModel(req)
  .then(resp => {
    const td = resp.todo;
    const updatedTodo = {
      id: td.id,
      todo: td.todo,
      done: td.done,
      steps: td.steps,
      dueDate: td.dueDate
    };
    return {
      status: resp.status,
      message: resp.message,
      todo: updatedTodo
    };
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default resetTodo;