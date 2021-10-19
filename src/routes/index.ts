import {Request, Response, Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.post('/user', controllers.users.addUser);
routes.post('/login', controllers.users.logInUser);
routes.put('/login', controllers.users.logOutUser);

routes.get('/todo', controllers.todos.getTodos);
routes.get('/todo/:todoId', controllers.todos.getTodo);
routes.post('/todo', controllers.todos.addTodo);
routes.put('/todo/:todoId', controllers.todos.updateTodo);

routes.post('/todo/:todoId/step', controllers.todoSteps.addStep);
routes.put('/todo/:todoId/step/:stepId', controllers.todoSteps.updateStep);

routes.all('*', (req: Request, res: Response) => {
  res.status(404).json({status: 404, message: '404'});
});

export default routes;