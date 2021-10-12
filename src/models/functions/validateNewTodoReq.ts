import { Request } from "express";

const validateNewTodoReq = (req : Request) : Promise<void> => {

  if (
    !req.body ||
    !req.body.todo ||
    !req.body.dueDate || 
    !(req.body.done === true || req.body.done === false) ||
    !(typeof(req.body.todo) === 'string') ||
    !req.body.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)
  ) return Promise.reject({status: 406, message: 'invalid'});
  
  return Promise.resolve();
};

export default validateNewTodoReq;