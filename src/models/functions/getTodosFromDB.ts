import Conn from "../db";

interface Todo {
  id: number;
  todo: string;
  done: boolean;
  dueDate: string;
};

const getTodosFromDB = (conn: Conn, userId : string | undefined) : Promise<Todo[]> => {

  const m = "SELECT * FROM todo WHERE userId = ?;";
  const p = userId;

  return conn.send(m, p)
  .then(resp => {
    return resp.map((todo : Todo) => {
      return {
        id: todo.id,
        done: todo.done,
        dueDate: todo.dueDate,
        todo: todo.todo
      };
    });
  });
};

export default getTodosFromDB;