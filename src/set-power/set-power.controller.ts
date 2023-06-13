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
} from '@nestjs/common';
import { SetPower } from './set-power.entity';
import { SetPowerService } from './set-power.service';
import { SetPowerDTO } from './set-power.dto';

@Controller('set-power')
export class SetPowerController {
  constructor(private setPowerService: SetPowerService) {}
  @Get()
  async GetAll(): Promise<SetPower[]> {
    return this.setPowerService.getAll();
  }

  @Get('gameid')
  async GetGameByRandom(): Promise<SetPower> {
    return this.setPowerService.getOneRandom();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<SetPower> {
    return this.setPowerService.getOneById(id);
  }

  @Post('add')
  async create(@Body() setpower: SetPowerDTO): Promise<SetPower> {
    return this.setPowerService.create(setpower);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() setpower: SetPowerDTO,
  ): Promise<SetPower> {
    return this.setPowerService.update(id, setpower);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.setPowerService.delete(id);
  }
}
