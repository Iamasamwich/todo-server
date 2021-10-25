import {Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.get('/ping', controllers.users.ping)

routes.post('/user', controllers.users.addUser);
routes.post('/login', controllers.users.logInUser);
routes.put('/login', controllers.users.logOutUser);

routes.get('/todo', controllers.todos.getTodos);
routes.get('/todo/:todoId', controllers.todos.getTodo);
routes.post('/todo', controllers.todos.addTodo);
routes.put('/todo/:todoId', controllers.todos.updateTodo);
routes.delete('/todo/:todoId', controllers.todos.deleteTodo);

routes.post('/todo/:todoId/step', controllers.todoSteps.addStep);
routes.put('/todo/:todoId/step/:stepId', controllers.todoSteps.updateStep);
routes.delete('/todo/:todoId/step/:stepId', controllers.todoSteps.deleteStep);

routes.all('*', (req, res) => {
  res.status(404).json({status: 404, message: '404'});
});

export default routes;