import { Request } from "express";
import checkUserIsLoggedIn from "./functions/checkUserIsLoggedIn";
import validateNewTodoReq from "./functions/validateNewTodoReq";
import checkIfUserIdExists from "./functions/checkIfUserIdExists";
import addTodoToDB from "./functions/addTodoToDB";

const addTodoModel = (req : Request) : Promise<{status: number, message: string}> => {

  return checkUserIsLoggedIn(req)
  .then(resp => {
    if (!resp) throw ({status: 401, message: 'not authorised'})
    return;
  })
  .then(() => checkIfUserIdExists(req.session.userId))
  .then(() => validateNewTodoReq(req))
  .then(() => addTodoToDB(req))
  .then(() => ({status: 201, message: 'todo added'}))

};

export default addTodoModel;