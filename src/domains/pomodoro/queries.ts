/* Third-party dependencies */
import 'reflect-metadata';

/** Our code */
// Entities
import { Pomodoro } from './entity';
import { User } from '../user/entity';

export const create = async (data: {
  description: string;
  endTime: Date;
  startTime: Date;
  userId: number;
}) => {
  const { description, endTime, startTime, userId } = data;

  const pomodoro = new Pomodoro();
  pomodoro.description = description;
  pomodoro.endTime = endTime;
  pomodoro.startTime = startTime;
  pomodoro.user = await User.findOne(userId);

  return pomodoro.save();
};
