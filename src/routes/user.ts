/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request, Router } from 'express';

/** Our code */
// Auth
import { create as createUser } from '../domains/user/queries';
import { login } from '../auth';
// Configs
import config from '../globals/config';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  createUser({ email, password })
    .then(user => {
      const token = jwt.sign(
        {
          userId: user.id,
          email,
        },
        config.jwtSecret,
        { expiresIn: '1h' },
      );
      return res.status(302).json({
        data: { ...user, token },
      });
    })
    .catch(error => res.status(400).json({ error: true }));
});

router.post('/login', login);

export default router;
