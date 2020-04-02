/** Third-party dependencies */
import { Router } from 'express';

/** Our code */
// Auth
import { changePassword, login } from '../auth';
// Middlewares
import checkJwt from '../middlewares/jwt';

const router = Router();

router.post('/login', login);
router.post('/change-password', [checkJwt], changePassword);

export default router;
