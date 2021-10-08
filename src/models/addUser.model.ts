import {Request} from 'express';

import addUserToDB from './functions/addUserToDB';
import checkIfUserInDB from './functions/checkIfUserInDB';

const addUserModel = (req: Request) => {
  return checkIfUserInDB(req.body.user.email)
  .then(resp => {
    if (resp) {
      throw ({status: 409, message: 'user already exists'})
    };
    return;
  })
  .then(() => addUserToDB({email: 'test email', name: 'test name', pword: 'test pword'}));
};

export default addUserModel;