import { Request, Response } from "express";

import addUserModel from "../../models/addUser.model";

const addUserController = (req: Request, res: Response) => {
  addUserModel(req)
  .then((resp) => res.status(resp.status).json(resp))
  .catch(err => {
    return res.status(err.status).json(err);
  });
};

export default addUserController;