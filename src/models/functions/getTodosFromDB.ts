import Conn from "../db";

interface Todo {
  id: number,
  userId: string;
  todo: string;
  done: boolean;
  dueDate: string;
};

const getTodosFromDB = (userId : string) : Promise<Todo[]> => {
  const conn = new Conn();

  const m = "SELECT * FROM todo WHERE userId = ?;";
  const p = userId;

  return conn.send(m, p)
  .then(resp => {
    if (resp.length === 0) throw ({status: 404, message: 'todos not found'});
    const todos = resp.map((todo : Todo) => {
      return {
        id: todo.id,
        userId: todo.userId,
        done: todo.done,
        dueDate: todo.dueDate,
        todo: todo.todo
      };
    });
    return todos;
  })
  .finally(() => {
    conn.end();
  });
};

export default getTodosFromDB;