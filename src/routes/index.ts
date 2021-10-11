import {Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.post('/users', controllers.users.addUserController);
routes.post('/login', controllers.users.logInUserController);
routes.put('/login', controllers.users.logOutUserController);

export default routes;