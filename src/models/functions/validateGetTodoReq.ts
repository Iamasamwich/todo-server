import { Request } from "express";

const validateGetTodo = (req: Request) : Promise<void> => {
  if (
    !req.params.todoId ||
    isNaN(Number(req.params.todoId))
  ) return Promise.reject({status: 406, message: 'invalid'});
  return Promise.resolve();
};

export default validateGetTodo;