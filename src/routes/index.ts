import {Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.post('/users', controllers.users.addUser);
routes.post('/login', controllers.users.logInUser);
routes.put('/login', controllers.users.logOutUser);


//get todos GET /todos

//add todo POST /todos
//get todo GET /todo/:id
//update todo PUT /todos/:id
//add todo step POST /todos/:id/step
//update todo step PUT /todos/:todoId/step/:todoStepId


export default routes;