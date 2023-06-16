import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {getConnection} from "typeorm";
import { Point } from './points.entity';
import { PointsDTO } from './points.dto';
import { User } from '../users/users.entity';
import jwtDecode from 'jwt-decode';
//import { UsersDTO } from '../users/users.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(name) {
    //return await this.pointsRepository.find();
    //await this.pointsRepository
	
	//console.log('balamsdfd='+name);
	
	console.log('balamsdfd=' +jwtDecode(name));
	
	let decodedTokenPayload : any= jwtDecode(name);
	if(decodedTokenPayload.user_type==0){
	console.log(decodedTokenPayload.user_type);
	}
	if(decodedTokenPayload.user_type===0){
	const pointsArr = await this.pointsRepository.createQueryBuilder().select(`transfer_balance.id as id,transfer_balance.from_id as from_id,transfer_balance.to_id as to_id ,transfer_balance.amount as amount ,transfer_balance.last_balance as last_balance,transfer_balance.transfer_on as transfer_on,users1.name as frmName,users2.name as toName,users2.balance as balance`)
.from("transfer_balance", "transfer_balance")
.leftJoin(User, 'users1',
                'users1.user_id = transfer_balance.from_id')
.leftJoin(User, 'users2',
                'users2.user_id = transfer_balance.to_id')
.groupBy("transfer_balance.id")				
.getRawMany();
//console.log(pointsArr);
     return pointsArr;
	 }
	 if(decodedTokenPayload.user_type!=0){
	const pointsArr = await this.pointsRepository.createQueryBuilder().select(`transfer_balance.id as id,transfer_balance.from_id as from_id,transfer_balance.to_id as to_id ,transfer_balance.amount as amount ,transfer_balance.last_balance as last_balance,transfer_balance.transfer_on as transfer_on,users1.name as frmName,users2.name as toName,users2.balance as balance`)
.from("transfer_balance", "transfer_balance")
.leftJoin(User, 'users1',
                'users1.user_id = transfer_balance.from_id')
.leftJoin(User, 'users2',
                'users2.user_id = transfer_balance.to_id')	
.where("transfer_balance.from_id = :from_id", { from_id: decodedTokenPayload.user_id })	
.groupBy("transfer_balance.id")			
.getRawMany();
//console.log(pointsArr);
     return pointsArr;
	 }
  }

  async create(data: PointsDTO) {
    const point = this.pointsRepository.create(data);
    let val = data.amount;
    await this.pointsRepository.save(data);
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        balance: () => `balance + ${data.amount}`,
      })
      .where('user_id = :user_id', { user_id: data.to_id })
      .execute();
	  await this.pointsRepository
      .createQueryBuilder()
      .update(Point)
      .set({
        last_balance: () => `last_balance + ${data.amount}`,
      })
      .where('to_id = :to_id', { to_id: data.to_id })
      .execute();
	  await this.pointsRepository
      .createQueryBuilder()
      .update(Point)
      .set({
        last_balance: () => `last_balance + ${data.amount}`,
      })
      .where('to_id = :to_id', { to_id: data.to_id })
      .execute();
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
