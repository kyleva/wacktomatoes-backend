/* Third-party dependencies */
import 'reflect-metadata';

/** Our code */
// Entities
import { User } from './entity';

export const create = (data: { email: string; password: string }) => {
  const { email, password } = data;
  const user: User = new User();

  user.email = email;
  user.password = password;

  user.hashPassword();

  return user.save();
};
