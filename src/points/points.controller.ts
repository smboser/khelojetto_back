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
  UseGuards,
} from '@nestjs/common';
import { Point } from './points.entity';
import { PointsService } from './points.service';
import { PointsDTO } from './points.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('points')
export class PointsController {
  constructor(private pointsService: PointsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(@Query('name') name: string): Promise<Point[]> {
    return this.pointsService.getAll(name);
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<PointsDTO> {
    return this.pointsService.getOneById(id);
  }

  /* @Get(':name/:id')
  findByLikeName(
    @Query() query: { name: string },
    @Param() param: { id: number },
  ) {
    return this.usersService.findStockezById({ ...query, ...param });
  } */
  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Body() point: PointsDTO): Promise<Point> {
    return this.pointsService.create(point);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() point: PointsDTO,
  ): Promise<Point> {
    return this.pointsService.update(id, point);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.pointsService.delete(id);
  }
}
