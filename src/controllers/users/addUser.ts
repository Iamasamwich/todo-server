import { Request, Response } from "express";

import addUserModel from "../../models/addUserModel";

const addUser = (req: Request, res: Response) => {
  return addUserModel(req)
  .then((resp) => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default addUser;