import { Request, Response } from "express";
import addTodoStepModel from "../../models/addTodoStepModel";

const addStep = (req : Request, res : Response) => {
  return addTodoStepModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default addStep;