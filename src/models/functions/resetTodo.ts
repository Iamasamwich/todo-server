import { TodoWithSteps } from "../../interfaces";
import Conn from "../db";

const resetTodo = (conn : Conn, todo : TodoWithSteps) => {

  const m = `
    UPDATE todo
    SET ?
    WHERE id = ?;
  `;

  const p = [
    {
      done: false
    },
    todo.id
  ];

  conn.send(m, p)
  .then(() => {
    Promise.all(todo.steps.map(step => {
      const m = `
        UPDATE todoStep
        SET done = false
        WHERE id = ?
      `;
      const p = step.id;
      return conn.send(m, p);
    }));
    return;
  });
};

export default resetTodo;