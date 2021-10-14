import makeHash from './makeHash';
import Conn from '../db';
import { Request } from 'express';

const addUserToDB = async (conn : Conn, req : Request) : Promise<string> => {

  const hashEmail = await makeHash(req.body.email);
  const hashPword = await makeHash(req.body.pword);

  const m = "INSERT INTO user SET ?";
  const p = {
    id: hashEmail,
    email: req.body.email,
    name: req.body.name,
    pword: hashPword
  };

  return conn.send(m, p)
  .then(() => hashEmail);
};

export default addUserToDB;