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
        return this.userRepository.findOne({ where: { id: id } });
    }
  
    async addUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async updateUser(data: Partial<User>): Promise<User> {
        await this.userRepository.update(data.id, data);
        return this.userRepository.findOne({ where: { id: data.id } });
      }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
}
