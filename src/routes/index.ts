import {Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.post('/users', controllers.users.addUser);
routes.post('/login', controllers.users.logInUser);
routes.put('/login', controllers.users.logOutUser);

export default routes;