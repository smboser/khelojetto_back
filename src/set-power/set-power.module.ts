import { Module } from '@nestjs/common';
import { SetPowerController } from './set-power.controller';
import { SetPowerService } from './set-power.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetPower } from './set-power.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SetPower])],
  controllers: [SetPowerController],
  providers: [SetPowerService],
})
export class SetPowerModule {}
