import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SetPowerModule } from './set-power/set-power.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConnectionConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PointsModule,
    AuthModule,
    SetPowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
