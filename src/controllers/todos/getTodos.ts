import { Request, Response } from "express";
import getTodosModel from "../../models/getTodosModel";

const getTodos = (req : Request, res: Response) => {
  return getTodosModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default getTodos;