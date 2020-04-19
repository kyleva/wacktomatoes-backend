/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

/** Our code */
import config from '../globals/config';
import { getTokenFromHeader } from '../modules/jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).json({
      error: {
        message: 'User session has expired.',
      },
    });
    return;
  }

  next();
};
