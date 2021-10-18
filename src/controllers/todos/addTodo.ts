import { Request, Response } from "express";
import addTodoModel from "../../models/addTodoModel";

const addTodo = (req : Request, res : Response) => {

  addTodoModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default addTodo;