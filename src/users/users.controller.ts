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
  Query,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async GetAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getOneById(id);
  }
  
  @Get(':name/:id')
  findByLikeName(
    @Query() query: { name: string },
    @Param() param: { id: number }
  ) {
        return this.usersService.findStockezById({...query, ...param});
    }

  @Post()
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
