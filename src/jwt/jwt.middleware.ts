import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedRequest extends Request {
    user: {
      id: number;
      name: string,
      email: string,
      password: string
    };
  }
  

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: AuthenticatedRequest, _: Response, next: NextFunction) {
    // Dapatkan token dari header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        // Verifikasi dan decode token
        const decoded = this.jwtService.verify(token);

        // Tambahkan decoded user ke dalam request
        req.user = decoded;
      } catch (error) {
        throw new BadRequestException('Invalid password');
        // Tangani kesalahan jika token tidak valid
        // Misalnya, token kadaluarsa atau tidak valid
      }
    }

    // Lanjutkan ke middleware selanjutnya
    next();
  }
}
