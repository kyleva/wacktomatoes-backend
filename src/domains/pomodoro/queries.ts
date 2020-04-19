/* Third-party dependencies */
import 'reflect-metadata';

/** Our code */
// Entities
import { Pomodoro } from './entity';
import { User } from '../user/entity';
// Helpers
import { getPayloadFromToken } from '../../modules/jwt';

export const create = async (data: {
  description: string;
  endTime: Date;
  startTime: Date;
  userId: number;
}) => {
  const { description, endTime, startTime, userId } = data;

  const pomodoro = new Pomodoro();
  pomodoro.description = description;
  pomodoro.endTime = new Date(endTime);
  pomodoro.startTime = new Date(startTime);
  pomodoro.user = await User.findOne(userId);

  return pomodoro.save();
};

export const getAll = async (data: { token: string }) => {
  const { token } = data;
  const { userId } = getPayloadFromToken(token);

  const pomodoros = await Pomodoro.find({ where: { user: { id: userId } } });

  return pomodoros;
};
