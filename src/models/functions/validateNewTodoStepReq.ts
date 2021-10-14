import { Request } from "express";

const validateNewTodoStepReq = (req : Request) : Promise<void> => {

  if (!req.body) return Promise.reject({status: 401, message: 'no body'});
  if (!req.body.todoId) return Promise.reject({status: 401, message: 'no todoId'});
  if (typeof(req.body.todoId) !== 'number') return Promise.reject({status: 401, message: 'todoid not number'});
  if (!req.body.step) return Promise.reject({status: 401, message: 'no step'});
  if (typeof(req.body.step) !== 'string')return Promise.reject({status: 401, message: 'step not string'})
  if (!(req.body.done === true || req.body.done === false)) return Promise.reject({status: 401, message: 'no done'});

  return Promise.resolve();
};

export default validateNewTodoStepReq;