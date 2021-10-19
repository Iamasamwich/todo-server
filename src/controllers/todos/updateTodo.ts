import { Request, Response } from "express";
import updateTodoModel from "../../models/updateTodoModel";

const updateTodo = (req: Request, res: Response) => {
  return updateTodoModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default updateTodo;