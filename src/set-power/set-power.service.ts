import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SetPower } from './set-power.entity';
import { SetPowerDTO } from './set-power.dto';

@Injectable()
export class SetPowerService {
  constructor(
    @InjectRepository(SetPower)
    private setpowerRepository: Repository<SetPower>,
  ) {}

  async getAll() {
    return await this.setpowerRepository.find();
  }

  async create(data: SetPowerDTO) {
    const setpower = this.setpowerRepository.create(data);
    await this.setpowerRepository.save(data);
    return setpower;
  }

  async getOneById(id: number): Promise<SetPowerDTO> {
    return await this.setpowerRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async read(id: number) {
    return await this.setpowerRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<SetPowerDTO>) {
    await this.setpowerRepository.update({ id }, data);
    return await this.setpowerRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    await this.setpowerRepository.delete({ id });
    return { deleted: true };
  }
}
