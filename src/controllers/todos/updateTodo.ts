import { Request, Response } from "express";
import updateTodoModel from "../../models/updateTodoModel";

const updateTodo = (req: Request, res: Response) => {
  return updateTodoModel(req)
  .then(resp => {
    const td = resp.todo;
    const updatedTodoRes = {
      id: td.id,
      todo: td.todo,
      done: td.done,
      dueDate: td.dueDate,
      steps: td.steps
    };
    return {status: resp.status, message: resp.message, todo: updatedTodoRes}
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default updateTodo;