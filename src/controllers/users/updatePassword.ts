import { Request, Response } from "express";
import updatePasswordModel from "../../models/updatePasswordModel";

const updatePassword = (req : Request, res : Response) => {
  return updatePasswordModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default updatePassword;