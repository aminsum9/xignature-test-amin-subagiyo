import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: "varchar", default: ""})
  name: string;

  @Column({ nullable: false, type: "varchar", default: ""})
  email: string;

  @Column({ nullable: false, type: "varchar", default: "" })
  password: string;
}

export const UserPublic = (user): any => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}