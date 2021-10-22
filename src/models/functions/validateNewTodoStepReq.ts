import { Request } from "express";

const validateNewTodoStepReq = (req : Request) : Promise<void> => {
  if (
    !req.params ||
    !req.params.todoId ||
    isNaN(Number(req.params.todoId)) ||
    !req.body ||
    !(req.body.step) ||
    !(typeof(req.body.step) === 'string') ||
    !(req.body.done === true || req.body.done === false)
  ) return Promise.reject({status: 406, message: 'invalid'});

  return Promise.resolve();
};

export default validateNewTodoStepReq;