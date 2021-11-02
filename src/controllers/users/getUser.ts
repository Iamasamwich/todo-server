import { Request, Response } from "express";
import getUserModel from "../../models/getUserModel";

const getUser = (req : Request, res : Response) => {
  return getUserModel(req)
  .then(resp => {
    return {
      status: resp.status,
      message: resp.message,
      user: {
        email: resp.user.email,
        name: resp.user.name
      }
    };
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default getUser;