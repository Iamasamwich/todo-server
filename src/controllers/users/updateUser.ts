import { Request, Response } from "express";
import updateUserModel from "../../models/updateUserModel";

const updateUser = (req : Request, res: Response) => {

  return updateUserModel(req)
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default updateUser;