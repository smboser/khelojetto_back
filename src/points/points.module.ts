import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './points.entity';
import { User } from 'src/users/users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Point, User])],
  controllers: [PointsController],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}
