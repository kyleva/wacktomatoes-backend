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
    res.status(401).json({
      error: {
        message: 'Please fill in all fields.',
      },
    });
    return;
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send({
      error: {
        message:
          'Something went wrong when attempting to change your password. Please try refreshing and try again.',
      },
    });
  }

  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    res.status(401).send({
      error: {
        message:
          'It looks like the wrong old/previous password was provided. Can you try again?',
      },
    });
    return;
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(401).json({
      error: {
        message: [...errors],
      },
    });
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

  if (!email || !password) {
    res.status(401).json({
      error: {
        message: 'Please provide both username and password.',
      },
    });
    return;
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail({ where: { email } });
  } catch (error) {
    res.status(401).json({
      error: {
        message:
          'Something went wrong when attempting to login. Please try refreshing and try again.',
      },
    });
    return;
  }

  console.log(email, password);

  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    res.status(401).json({
      error: {
        message: 'The provided password was incorrect.',
      },
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email,
    },
    config.jwtSecret,
    { expiresIn: '30 days' },
  );

  res.status(200).json({ data: { email, token } });
};

export default {
  changePassword,
  login,
};
