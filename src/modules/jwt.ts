/** Third-party dependencies */
import * as jwt from 'jsonwebtoken';

/** Our code */
import config from '../globals/config';

export const getPayloadFromToken = (token) => {
  const jwtPayload = <any>jwt.verify(token, config.jwtSecret);

  return jwtPayload;
};
