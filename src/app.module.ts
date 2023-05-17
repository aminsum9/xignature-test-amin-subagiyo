import { Inject, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
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

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: () => ({
//         type: 'postgres',
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT, 10),
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         entities: [User],
//         synchronize: true,
//       }),
//     }),
//     TypeOrmModule.forFeature([User, UserRepository]),
//     UsersModule,
//     JwtModule.register({
//       secret: 'rahasia', 
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AppController, UsersController],
//   providers: [AppService, UsersService, UserRepository, JwtService],
// })

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
