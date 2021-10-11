import { Request, Response } from "express";
import logOutModel from "../../models/logOut.model";

const logOutUserController = (req : Request, res : Response) => {
  return logOutModel(req)
  .then(resp => res.status(resp.status).json(resp));
};

export default logOutUserController;