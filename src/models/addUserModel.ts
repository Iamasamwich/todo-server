import {Request} from 'express';
import addUserToDB from './functions/addUserToDB';
import checkIfUserInDB from './functions/checkIfUserInDB';
import logUserIn from './functions/logUserIn';
import Conn from './db';

const addUserModel = (req: Request) => {

  const conn = new Conn();

  return Promise.resolve()
  .then(() => {
    if (!req.body) throw ({status: 406, message: 'no body'});
    if (!req.body.email) throw ({status: 406, message: 'no email'});
    if (typeof(req.body.email) !== 'string') throw ({status: 406, message: 'invalid email'});
    if (!req.body.name) throw ({status: 406, message: 'no name'});
    if (typeof(req.body.name) !== 'string') throw ({status: 406, message: 'invalid name'});
    if (!req.body.pword) throw ({status: 406, message: 'no password'});
    if (typeof(req.body.pword) !== 'string') throw ({status: 406, message: 'invalid password'});
    return;
  })
  .then(() => checkIfUserInDB(conn, req.body.email))
  .then((resp : Boolean) => {
    if (resp) {
      throw ({status: 409, message: 'user already exists'})
    };
    return;
  })
  .then(() => addUserToDB(conn, req)) 
  .then(userId => logUserIn(req, userId))
  .then(() => ({status: 201, message: 'user created'}))
  .finally(() => {
    conn.end();
  });
};

export default addUserModel;