import { Request } from "express";
import Conn from "./db";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodosFromDB from "./functions/getTodosFromDB";

const getTodosModel = (req: Request) => {

  const conn = new Conn();

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodosFromDB(conn, req.session.userId))
  .then(todos => ({status: 200, message: 'todos fetched', todos}))
  .finally(() => {
    conn.end();
  });
};

export default getTodosModel;