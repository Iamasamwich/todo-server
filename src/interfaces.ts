export interface Res {
  status: number;
  message: string;
};

export interface Todo {
  id: number;
  todo: string;
  done: boolean;
  dueDate: string;
};

export interface TodoWithUser extends Todo {
  userId: string;
};

export interface TodoWithSteps extends Todo {
  steps: Step[];
};

export interface Step {
  id: number;
  step: string;
  done: boolean;
  todoId: number;
};

export interface UserDetails {
  id: string;
  email: string;
  pword: string;
  name: string;
};
