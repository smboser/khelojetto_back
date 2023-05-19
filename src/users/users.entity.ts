import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    console.log('at beforeInsert');
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  mobile: string;

  @Column()
  usertype: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  added_on: string;

  @Column()
  user_status: number;

  @Column({
    nullable: true,
  })
  transaction_password: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
  })
  revenue: string;

  @Column()
  l_request: number;

  @Column()
  joker_a: number;

  @Column()
  tripple_a: number;

  @Column()
  single_a: number;

  @Column()
  double_a: number;

  @Column()
  joker_p: number;

  @Column()
  tripple_p: number;

  @Column()
  single_p: number;

  @Column()
  double_p: number;

  @Column()
  sto_id: number;

  @Column()
  ag_id: number;

  @Column()
  balance: number;
}
