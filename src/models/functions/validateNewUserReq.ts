import {Request} from 'express';

const validateNewUserReq = (req : Request) : Promise<Boolean> => {
  return new Promise ((resolve, reject) => {
    if (
      !req.body ||
      !req.body.email ||
      !req.body.name ||
      !req.body.pword
    ) reject ({status: 406, message: 'invalid'});
    return resolve (true);
  });
};

export default validateNewUserReq;