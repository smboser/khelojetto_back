import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { SetPowerModule } from './set-power/set-power.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConnectionConfig), UsersModule, SetPowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
