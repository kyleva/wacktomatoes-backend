import { BaseEntity } from 'typeorm';

export interface User extends BaseEntity {
  id?: number;
  createdDate?: Date;
  email: string;
  password: string;
}
