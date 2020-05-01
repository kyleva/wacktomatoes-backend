/** Third-party dependencies */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, Length } from 'class-validator';

/** Our code */
import { User } from '../user/entity';

@Entity()
export class Pomodoro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Length(0, 280)
  description: string;

  @Column()
  @IsDate()
  endTime: Date;

  @Column()
  @IsDate()
  startTime: Date;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne((type) => User, (user) => user.pomodoros)
  user: User;
}
