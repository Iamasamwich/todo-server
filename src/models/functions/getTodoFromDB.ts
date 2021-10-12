import Conn from "../db";

interface Todo {
  id: number;
  userId: string;
  todo: string;
  done: boolean;
  dueDate: string;
};

const getTodoFromDB = (id: number) : Promise<Todo> => {
  const conn = new Conn();

  const m = "SELECT * FROM todo WHERE id = ?;";
  const p = id;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'todo not found'});
    return resp[0];
  })
};

export default getTodoFromDB;