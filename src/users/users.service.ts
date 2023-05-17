import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './users.repository';
import { hashSync } from 'bcryptjs';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        // private userRepository: Repository<User>,
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    private data: any[] = [];

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    async addUser(userData: Partial<User>): Promise<User> {

        // validate empty data
        if(!userData.name || !userData.email || !userData.password)
        {
            throw new BadRequestException('Nama, Email, and Password is required');
        }
        // Validasi password
        if (!isValidPassword(userData.password)) {
            throw new BadRequestException('Invalid password');
        }

        // Hash password
        const hashedPassword = hashSync(userData.password, 10);
        userData.password = hashedPassword;

        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async loginUser(credentials: { email: string; password: string }): Promise<{user: User, token: string }> {
        // Lakukan logika autentikasi, contoh sederhana di sini
        const userData = await this.userRepository.findOne({ where: { email: credentials.email } });

        if (!userData) {
            throw new NotFoundException('User not found');
        }

        // Menghasilkan token JWT
        const token = this.jwtService.generateToken({ userId: (await userData).id });

        return {user: userData, token: token };
    }

    async updateUser(data: Partial<User>): Promise<{success: boolean, message: string, user: User}> {
        
        var user = await this.userRepository.findOne({ where: { id: data.id } });

        if(!user)
        {
            return {success: false, message: 'user tidak ditemukan!', user: user}
        }

        
        await this.userRepository.update(data.id, data);

        return {success: true, message: 'berhasil mengupdate user', user: user};
    }

    async deleteUser(id: number): Promise<{success: boolean, message: string}> {

        var user = await this.userRepository.findOne({ where: { id: id } });

        if(!user)
        {
            return {success: false, message: 'user tidak ditemukan!'}
        }

        await this.userRepository.delete(id);
        return {success: true, message: 'berhasil menghapus user'}
    }

}

// Validasi password
function isValidPassword(password: string): boolean {
    // Memeriksa panjang minimal
    if (password.length < 8) {
        return false;
    }

    // Memeriksa keberadaan huruf, simbol, dan angka
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return regex.test(password);
}
