import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<UsersDTO> {
    return this.usersService.getOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('type/:id')
  async GetAllbyType(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.usersService.getAllByType(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('balance/:id')
  async GetBalanceById(@Param('id', ParseIntPipe) id: number): Promise<UsersDTO> {
    return this.usersService.getBalanceById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('stokes/:id')
  async GetAgentbyStokesId(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.usersService.GetAgentbyStokesId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Body() user: UsersDTO): Promise<User> {
    return this.usersService.create(user);
	
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UsersDTO,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.usersService.delete(id);
  }
}
