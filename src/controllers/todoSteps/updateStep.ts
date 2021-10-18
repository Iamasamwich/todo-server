import { Request, Response } from "express";
import updateTodoStepModel from "../../models/updateTodoStepModel";

const updateStep = (req : Request, res: Response) => {
  updateTodoStepModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default updateStep;