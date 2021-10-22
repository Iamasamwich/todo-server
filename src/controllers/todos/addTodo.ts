import { Request, Response } from "express";
import addTodoModel from "../../models/addTodoModel";

interface TodoNoUser {
  id: number;
  todo: string;
  done: boolean;
  dueDate: string;
  steps: {
    done: boolean;
    id: number;
    step: string;
  }[];
};

const addTodo = (req : Request, res : Response) => {
  return addTodoModel(req)
  .then(resp => {
    const todoNoUser : TodoNoUser = {
      id: resp.todo.id,
      todo: resp.todo.todo,
      done: resp.todo.done,
      dueDate: resp.todo.dueDate,
      steps: resp.todo.steps
    };
    return {status: resp.status, message: resp.message, todo: todoNoUser};
  })
  .then(resp => res.status(resp.status).json(resp))
  .catch(err => res.status(err.status).json(err));
};

export default addTodo;