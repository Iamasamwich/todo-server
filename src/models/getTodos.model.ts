import { Request } from "express";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import getTodosFromDB from "./functions/getTodosFromDB";

const getTodosModel = (req: Request) => {
  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'});
    return;
  })
  .then(() => getTodosFromDB(req.session.userId))
  .then(todos => ({status: 200, message: 'todos fetched', todos}))
};

export default getTodosModel;