import { Request } from "express";

const validateLoginUserReq = (req: Request) : Promise<void> => {

  return new Promise ((resolve, reject) => {
    if (
      !req.body ||
      !req.body.email ||
      !req.body.pword
    ) return reject ({status: 406, message: 'invalid'});
    return resolve ();
  });
};

export default validateLoginUserReq;