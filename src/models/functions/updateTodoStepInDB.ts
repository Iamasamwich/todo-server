import { Request } from "express";
import Conn from "../db";

const updateTodoStepInDB = (conn : Conn, req : Request) => {
  const m = `
    UPDATE todoStep 
    SET ? 
    WHERE id = ?;
  `;
  const p = [{
    step: req.body.step,
    done: req.body.done
  }, Number(req.params.stepId)];

  return conn.send(m, p);
};

export default updateTodoStepInDB;