import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { validate } from 'class-validator';

import { User } from '../domains/user/entity';
import config from '../globals/config';

export const changePassword = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    res.status(400).send();
    return;
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send();
  }

  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    res.status(401).send();
    return;
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  user.hashPassword();
  userRepository.save(user);

  res.status(204).json({
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log({ email, password });
  console.log('SAD');

  if (!email || !password) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail({ where: { email } });
  } catch (error) {
    res.status(401).json({
      error: true,
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email,
    },
    config.jwtSecret,
    { expiresIn: '1h' },
  );

  res.status(200).json({ data: { token } });
};

export default {
  changePassword,
  login,
};
