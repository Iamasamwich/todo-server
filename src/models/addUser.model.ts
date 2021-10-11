import {Request} from 'express';

import addUserToDB from './functions/addUserToDB';
import checkIfUserInDB from './functions/checkIfUserInDB';
import validateNewUserReq from './functions/validateNewUserReq';
import logUserIn from './functions/logUserIn';

const addUserModel = (req: Request) => {

  return validateNewUserReq(req)
  .then(() => checkIfUserInDB(req.body.email))
  .then((resp : Boolean) => {
    if (resp) {
      throw ({status: 409, message: 'user already exists'})
    };
    return;
  })
  .then(() => addUserToDB({email: req.body.email, name: req.body.name, pword: req.body.pword}))
  .then(userId => logUserIn(req, userId))
  .then(() => ({status: 201, message: 'user created'}));
};

export default addUserModel;