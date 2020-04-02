/* Third-party dependencies */
import 'reflect-metadata';

/** Our code */
// Entities
import { User } from './entity';
// Types
import { User as UserType } from './types';

export const create = data => {
  const { email, password } = data;
  const user: UserType = new User();

  user.email = email;
  user.password = password;

  return user.save();
};
