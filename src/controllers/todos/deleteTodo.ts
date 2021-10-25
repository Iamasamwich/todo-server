import { Request, Response } from "express";
import deleteTodoModel from "../../models/deleteTodoModel";

const deleteTodo = (req : Request, res : Response) => {
  return deleteTodoModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default deleteTodo;