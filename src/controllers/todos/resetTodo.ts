import { Request, Response } from "express";
import resetTodoModel from "../../models/resetTodoModel";

const resetTodo = (req : Request, res : Response) => {

  return resetTodoModel(req)
  .then(resp => {
    console.log(resp);
    return resp
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default resetTodo;