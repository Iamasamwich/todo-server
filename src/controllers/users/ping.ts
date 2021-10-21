import { Request, Response } from "express";

const ping = (req : Request, res : Response) => {
  if (
    req.session &&
    req.session.userId &&
    req.session.loggedIn  
  ) return res.status(200).json({status: 200, message: 'ok'});
  return res.status(200).json({status: 200, message: 'unknown'});
};

export default ping;