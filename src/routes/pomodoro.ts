import { NextFunction, Response, Request, Router } from 'express';

import checkJwt from '../middlewares/jwt';

import { create as createPomodoro } from '../domains/pomodoro/queries';

const router = Router();

router.post(
  '/create',
  [checkJwt],
  (req: Request, res: Response, next: NextFunction) => {
    const { description, endTime, startTime, userId } = req.body;

    createPomodoro({ description, endTime, startTime, userId })
      .then(pomodoro =>
        res.status(300).json({
          data: pomodoro,
        }),
      )
      .catch(error => res.status(400).json({ error }));
  },
);

export default router;
