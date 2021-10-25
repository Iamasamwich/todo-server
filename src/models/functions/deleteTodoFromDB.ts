import Conn from "../db";

const deleteTodoFromDB = (conn : Conn, todoId: number) => {

  const m = `
    DELETE FROM todo
    WHERE id = ?;
  `;
  const p = todoId;

  return conn.send(m, p)
};

export default deleteTodoFromDB;