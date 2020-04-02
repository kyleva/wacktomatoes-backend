/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

/** Our code */
import config from '../globals/config';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.header['auth'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: '1hr',
  });
  res.setHeader('token', newToken);
};