import { NextFunction, Response, Request, Router } from 'express';

import checkJwt from '../middlewares/jwt';
import { getPayloadFromToken } from '../modules/jwt';

import { create as createPomodoro } from '../domains/pomodoro/queries';

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
    .catch((error) => res.status(400).json({ error }));
});

export default router;
