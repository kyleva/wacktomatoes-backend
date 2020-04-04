/** Third-party dependencies */
import * as bcrypt from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';

/** Our code */
import { Pomodoro } from '../pomodoro/entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => Pomodoro,
    pomodoro => pomodoro.user,
  )
  pomodoros: Pomodoro;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
