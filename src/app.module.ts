import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './users/users.repository';
import { UsersModule } from './users/users.module';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
// 
import { JwtMiddleware } from './jwt/jwt.middleware';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'postgres',
      entities: [User],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
    UsersModule,
    JwtModule.register({
      secret: 'rahasia', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, UserRepository, JwtService],
})
export class AppModule {
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
