import { NextFunction, Response, Request, Router } from 'express';

import verifyJwt from '../middlewares/jwt';
import { getPayloadFromToken, getTokenFromHeader } from '../modules/jwt';

import {
  create as createPomodoro,
  getAll as getAllForUser,
} from '../domains/pomodoro/queries';

const router = Router();

router.post(
  '/create',
  verifyJwt,
  (req: Request, res: Response, next: NextFunction) => {
    const { description, endTime, startTime } = req.body;
    const token = getTokenFromHeader(req);
    const { userId } = getPayloadFromToken(token);

    createPomodoro({ description, endTime, startTime, userId })
      .then((pomodoro) =>
        res.status(300).json({
          data: pomodoro,
        }),
      )
      .catch((error) => res.status(503).json({ error: { message: error } }));
  },
);

router.post('/getAllForUser', verifyJwt, (req, res, next) => {
  const token = getTokenFromHeader(req);

  getAllForUser({ token })
    .then((pomodoros) =>
      res.status(300).json({
        data: pomodoros,
      }),
    )
    .catch((error) => res.status(400).json({ error: { message: error } }));
});

export default router;
