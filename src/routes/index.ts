import {Router} from 'express';
import controllers from '../controllers';

const routes = Router();

routes.post('/users', controllers.users.addUserController);

export default routes;