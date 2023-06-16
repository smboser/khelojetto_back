import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';
import { UsersDTO } from '../users/users.dto';
import jwtDecode from 'jwt-decode';
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
        'update_agents_revenue',
      ],
    });
  }

  async getBalanceById(id: number): Promise<UsersDTO> {
    return await this.usersRepository.findOne({
      where: {
        user_id: id,
      },
      select: ['balance'],
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
        usertype: 2,
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

 async getAllByType(typeId: number,tokenPayload:string) {
    
	let decodedTokenPayload : any= jwtDecode(tokenPayload);
	if(typeId===3){
	  const pointsArr = await this.usersRepository.createQueryBuilder().select(`users1.user_id as user_id,users1.username as username,users1.name as name ,users1.sto_id as sto_id ,users1.revenue as revenue,users1.type as type,users1.balance as balance, users2.name as stoName,users3.name as agName`)
.from("users", "users1")
.leftJoin(User, 'users2', 'users1.sto_id = users2.user_id')
.leftJoin(User, 'users3', 'users1.ag_id = users3.user_id')
.where("users1.usertype = :usertype", { usertype: typeId })	
.groupBy("users1.user_id")
.getRawMany(); 
console.log("PLAYER="+pointsArr);
     return pointsArr;             
}
if(typeId===2){

  const pointsArr = await this.usersRepository.createQueryBuilder().select(`users1.user_id as user_id,users1.username as username,users1.name as name ,users1.sto_id as sto_id ,users1.revenue as revenue,users1.type as type,users1.balance as balance,users2.name as frmName`)
.from("users", "users1")
.innerJoin(User, 'users2', 'users1.sto_id = users2.user_id')
.where("users1.usertype = :usertype", { usertype: typeId })	
.groupBy("users1.user_id")
.getRawMany(); 
console.log("AGENT="+pointsArr);
     return pointsArr;             

}

if(typeId===1){

  const pointsArr = await this.usersRepository.createQueryBuilder().select(`users1.user_id as user_id,users1.username as username,users1.name as name ,users1.sto_id as sto_id ,users1.revenue as revenue,users1.type as type,users1.balance as balance,users2.name as frmName`)
.from("users", "users1")
.innerJoin(User, 'users2', 'users1.sto_id = 0')
.where("users1.usertype = :usertype", { usertype: typeId })	
.groupBy("users1.user_id")
.getRawMany(); 
console.log("AGENT="+pointsArr);
     return pointsArr;             

}		


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
