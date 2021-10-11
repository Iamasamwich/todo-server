import { Request, Response } from "express";
import logInModel from "../../models/logIn.model";

const loginUserController = (req : Request, res : Response) => {
  return logInModel(req)
  .then(resp => {
    return res.status(200).json(resp)
  })
  .catch(err => res.status(err.status).json(err))
};

export default loginUserController;