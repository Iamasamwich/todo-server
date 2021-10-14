import { Request } from "express";

const validateLoginUserReq = (req: Request) : Promise<void> => {

  if (
    !req.body ||
    !req.body.email ||
    !req.body.pword
  ) return Promise.reject ({status: 406, message: 'invalid'});
  return Promise.resolve();
};

export default validateLoginUserReq;