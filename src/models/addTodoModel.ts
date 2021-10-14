import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import validateNewTodoReq from "./functions/validateNewTodoReq";
import checkIfUserIdExists from "./functions/checkIfUserIdExists";
import addTodoToDB from "./functions/addTodoToDB";

const addTodoModel = (req : Request) : Promise<{status: number, message: string}> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return;
  })
  .then(() => checkIfUserIdExists(conn, req.session.userId))
  .then(() => validateNewTodoReq(req))
  .then(() => addTodoToDB(conn, req))
  .then(() => ({status: 201, message: 'todo added'}))
  .finally(() => {
    conn.end();
  })

};

export default addTodoModel;