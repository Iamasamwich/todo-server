import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import validateNewTodoReq from "./functions/validateNewTodoReq";
import addTodoToDB from "./functions/addTodoToDB";
import getUserDetails from "./functions/getUserDetails";

const addTodoModel = (req : Request) : Promise<{status: number, message: string}> => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return getUserDetails(conn, req);
  })
  .then(() => validateNewTodoReq(req))
  .then(() => addTodoToDB(conn, req))
  .then(() => ({status: 201, message: 'todo added'}))
  .finally(() => {
    conn.end();
  });
};

export default addTodoModel;