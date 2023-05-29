import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.usersRepository.find();
  }

  async create(data: UsersDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  async getOneById(id: number): Promise<UsersDTO> {
    return await this.usersRepository.findOne({
      where: {
        user_id: id,
      },
      select: [
        'user_id',
        'username',
        'name',
        'email',
        'mobile',
        'usertype',
        'user_status',
		'revenue',
		'type',
        'sto_id',
		'ag_id',
		'joker_a',
		'tripple_a',
		'single_a',
		'double_a',
		'joker_p',
		'tripple_p',
		'single_p',
		'double_p',
		'update_player_revenue',
		'update_agents_revenue'
      ],
    });
  }

  async findStockezById({
    name,
    id,
  }: {
    name: string;
    id: number;
  }): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        sto_id: id,
      },
    });
  }
  
  async GetAgentbyStokesId(stokesId: number) {
    return await this.usersRepository.find({
      where: {
        sto_id: stokesId,
		usertype:2
      },
    });
  }

  async getOneByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async getAllByType(typeId: number) {
    return await this.usersRepository.find({
      where: {
        usertype: typeId,
      },
    });
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { user_id: id } });
  }

  async update(user_id: number, data: Partial<UsersDTO>) {
    if (data.password && data.password !== '')
      data.password = await bcrypt.hash(data.password, 8);
    if (data.confirmPassword || data.confirmPassword === '')
      delete data.confirmPassword;
    await this.usersRepository.update({ user_id }, data);
    return await this.usersRepository.findOne({ where: { user_id: user_id } });
  }

  async delete(user_id: number) {
    const res = await this.usersRepository.delete({ user_id });
    if (res.affected && res.affected > 0) return { deleted: true };
    return { deleted: false };
  }
}
