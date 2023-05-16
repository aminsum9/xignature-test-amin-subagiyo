import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../entities/user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        // private userRepository: Repository<User>,
        private userRepository: UserRepository,
      ) {}
      
    private data: any[] = [];

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: 1 } });
    }
  
    addUser(newUser: any): void {
      this.data.push(newUser);
    }

    updateUser(): string[] {
      return this.data;
    }

    deleteUser(): string[] {
      return this.data;
    }
}
