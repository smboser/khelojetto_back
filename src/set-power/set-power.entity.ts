import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity({ name: 'set_power' })
export class SetPower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  game_id: string;

  @Column()
  power: number;
}
