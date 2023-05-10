import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    await this.usersRepository.save(data);
    return user;
  }

  async getOneById(id: number): Promise<UsersDTO> {
    return await this.usersRepository.findOne({
      where: {
        user_id: id,
      },
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

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { user_id: id } });
  }

  async update(user_id: number, data: Partial<UsersDTO>) {
    await this.usersRepository.update({ user_id }, data);
    return await this.usersRepository.findOne({ where: { user_id: user_id } });
  }

  async delete(user_id: number) {
    await this.usersRepository.delete({ user_id });
    return { deleted: true };
  }
}
