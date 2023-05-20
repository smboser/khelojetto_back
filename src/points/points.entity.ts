import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity({ name: 'transfer_balance' })
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from_id: number;

  @Column()
  to_id: number;

  @Column()
  amount: number;

  @Column()
  transfer_on: string;

  @Column()
  last_balance: number;
}
