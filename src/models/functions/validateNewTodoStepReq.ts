import { Request } from "express";

const validateNewTodoStepReq = (req : Request) : Promise<void> => {

  if (
    !req.body ||
    !req.body.todoId ||
    !(typeof(req.body.todoId) === 'number') ||
    !(req.body.step) ||
    !(typeof(req.body.step) === 'string') ||
    !(req.body.done === true || req.body.done === false)
  ) return Promise.reject({status: 406, message: 'invalid'});

  return Promise.resolve();
};

export default validateNewTodoStepReq;