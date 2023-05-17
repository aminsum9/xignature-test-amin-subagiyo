import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '../jwt/jwt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    JwtModule.register({
        secret: 'rahasia', // Replace with your own secret key
        signOptions: { expiresIn: '1h' }, // Optional: token expiration time
      }),
],
  controllers: [UsersController],
  providers: [UsersService,UserRepository,JwtService],
})
export class UsersModule {}
