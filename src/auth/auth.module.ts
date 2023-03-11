import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { Validation } from 'src/utils/validation';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    ConfigModule,
    HttpModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PrismaService,
    ConfigService,
    Validation,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
