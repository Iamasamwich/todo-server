import { Request, Response } from "express";
import getTodoModel from "../../models/getTodoModel";

const getTodo = (req : Request, res : Response) => {
  return getTodoModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default getTodo;