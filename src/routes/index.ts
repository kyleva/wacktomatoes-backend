/** Third-party libraries */
import { Router } from 'express';

/** Our code */
import auth from './auth';
import pomodoro from './pomodoro';
import user from './user';

const routes = Router();
routes.use('/auth', auth);
routes.use('/pomodoro', pomodoro);
routes.use('/user', user);

export default routes;
