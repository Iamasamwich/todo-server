import { Request } from "express";

const validateNewTodoReq = (req : Request) : Promise<void> => {
  if (
    !req.body ||
    !req.body.todo ||
    !req.body.dueDate
    ) return Promise.reject({status: 406, message: 'invalid'});

  if (
    typeof(req.body.todo) !== 'string' ||
    !req.body.dueDate.match(/^\d{4}-\d{2}-\d{2}$/)
  ) return Promise.reject({status: 406, message: 'ainvalid'});
  
  return Promise.resolve();
};

export default validateNewTodoReq;