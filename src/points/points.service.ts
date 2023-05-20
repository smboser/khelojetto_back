import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Point } from './points.entity';
import { PointsDTO } from './points.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
  ) {}

  async getAll() {
    return await this.pointsRepository.find();

    // return pointsArr;
  }

  async create(data: PointsDTO) {
    const point = this.pointsRepository.create(data);
    await this.pointsRepository.save(data);
    return point;
  }

  async getOneById(id: number): Promise<PointsDTO> {
    return await this.pointsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  /* async findStockezById({
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
  } */

  /* async getOneByEmail(email: string) {
    return await this.pointsRepository.findOne({
      where: {
        email: email,
      },
    });
  } */

  async read(id: number) {
    return await this.pointsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<PointsDTO>) {
    await this.pointsRepository.update({ id }, data);
    return await this.pointsRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    await this.pointsRepository.delete({ id });
    return { deleted: true };
  }
}
