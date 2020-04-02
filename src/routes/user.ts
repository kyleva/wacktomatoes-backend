/** Third-party dependencies */
import { NextFunction, Response, Request, Router } from 'express';

/** Our code */
// Auth
import { create as createUser } from '../domains/user/queries';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  createUser({ email, password })
    .then(user =>
      res.status(300).json({
        data: user,
      }),
    )
    .catch(error => res.status(400).send());
});

export default router;
