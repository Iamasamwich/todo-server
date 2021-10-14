import { Request, Response } from "express";
import logInModel from "../../models/logInModel";

const loginUser = (req : Request, res : Response) => {
  return logInModel(req)
  .then(resp => {
    return res.status(200).json(resp)
  })
  .catch(err => res.status(err.status).json(err))
};

export default loginUser;