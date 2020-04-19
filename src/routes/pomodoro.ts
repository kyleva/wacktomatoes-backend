import { NextFunction, Response, Request, Router } from 'express';

import { getPayloadFromToken } from '../modules/jwt';

import {
  create as createPomodoro,
  getAll as getAllForUser,
} from '../domains/pomodoro/queries';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { description, endTime, startTime, token } = req.body;
  const { userId } = getPayloadFromToken(token);

  createPomodoro({ description, endTime, startTime, token, userId })
    .then((pomodoro) =>
      res.status(300).json({
        data: pomodoro,
      }),
    )
    .catch((error) => res.status(503).json({ error: { message: error } }));
});

router.post('/getAllForUser', (req, res, next) => {
  const { token } = req.body;

  getAllForUser({ token })
    .then((pomodoros) =>
      res.status(300).json({
        data: pomodoros,
      }),
    )
    .catch((error) => res.status(400).json({ error: { message: error } }));
});

export default router;
