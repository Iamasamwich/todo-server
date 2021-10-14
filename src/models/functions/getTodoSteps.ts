import Conn from '../db';

interface TodoStep {
  id: number;
  todoId: number;
  step: string;
  done: boolean;
};

interface Todo {
  id: number;
  todo: string;
  dueDate: string;
  done: boolean;
};

interface TodoWithSteps extends Todo {
  steps: TodoStep[];
};


const getTodoSteps = (todo : Todo) : Promise<TodoWithSteps> => {
  const conn = new Conn();

  const m = 'SELECT * FROM todoStep WHERE todoId = ?;';
  const p = todo.id;

  return conn.send(m, p)
  .then(resp => {
    const steps = resp.map((step : any) => {
      return {
        id: step.id,
        todoId: step.todoId,
        step: step.step,
        done: step.done
      };
    });

    return {...todo, steps};
  })
  .finally(() => {
    conn.end();
  });
};

export default getTodoSteps;