import Router from 'express';
import UserController from './app/controllers/UserController';
import TokenController from './app/controllers/TokenController';

import AuthMiddlware from './app/middlwares/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/token', TokenController.store);

routes.use(AuthMiddlware);

routes.put('/user', UserController.update);

export default routes;
