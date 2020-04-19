/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

/** Our code */
import config from '../globals/config';

export const getPayloadFromToken = (token) => {
  const jwtPayload = <any>jwt.verify(token, config.jwtSecret);

  return jwtPayload;
};

export const getTokenFromHeader = (req: Request) => {
  let token: string =
    (req.headers['x-access-token'] as string) ||
    (req.headers['authorization'] as string) ||
    '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  return token;
};
