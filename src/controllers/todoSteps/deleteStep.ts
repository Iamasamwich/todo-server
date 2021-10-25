import { Request, Response } from "express";
import deleteStepModel from "../../models/deleteStepModel";

const deleteStep = (req: Request, res: Response) => {
  return deleteStepModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default deleteStep;