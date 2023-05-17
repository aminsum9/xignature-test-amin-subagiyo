import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '../jwt/jwt.service';
// 
import { JwtMiddleware } from '../jwt/jwt.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
        JwtModule.register({
            secret: 'rahasia', // Replace with your own secret key
            signOptions: { expiresIn: '1h' }, // Optional: token expiration time
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, JwtService],
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(JwtMiddleware)
          .exclude(
            { path: 'users/login', method: RequestMethod.POST },
            { path: 'users/add-user', method: RequestMethod.POST },
          )
          .forRoutes('*');
      }
}
