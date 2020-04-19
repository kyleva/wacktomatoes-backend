/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request, Router } from 'express';

/** Our code */
// Auth
import { create as createUser } from '../domains/user/queries';
import { login } from '../auth';
// Configs
import config from '../globals/config';
// Helpers
import { getPayloadFromToken, getTokenFromHeader } from '../modules/jwt';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  createUser({ email, password })
    .then((user) => {
      const token = jwt.sign(
        {
          userId: user.id,
          email,
        },
        config.jwtSecret,
        { expiresIn: '30 days' },
      );
      return res.status(302).json({
        data: { email, token },
      });
    })
    .catch((error) => res.status(400).json({ error: { message: error } }));
});

router.post('/verify', (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);
  const jwtPayload = getPayloadFromToken(token);

  if (jwtPayload) {
    res.status(302).send({
      data: { email: jwtPayload.email, token },
    });
    return next();
  }

  res.status(400).json({ error: { message: 'User session has expired.' } });
});

router.post('/login', login);

export default router;
