import Conn from "../db";

interface NewTodo {
  done: boolean;
  todo: string;
  dueDate: string;
}

interface Todo extends NewTodo {
  userId: string;
  id: number;
}

const updateTodoInDB = (todo: Todo, newTodo: NewTodo) => {

  const conn = new Conn()
  const m = `
    UPDATE todo
    SET ?
    WHERE id = ?;
  `;
  const p = [
    {
      done: newTodo.done,
      todo: newTodo.todo,
      dueDate: newTodo.dueDate
    },
    todo.id
  ];

  return conn.send(m, p)
  .finally(() => {
    conn.end();
  });
};

export default updateTodoInDB;