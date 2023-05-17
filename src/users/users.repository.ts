import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Tambahkan metode tambahan yang dibutuhkan untuk akses ke data pengguna
  async findByName(name: string): Promise<User[]> {
    return this.find({ where: { name } });
  }

  // Contoh lain...
  // async findByEmail(email: string): Promise<User> {
  //   return this.findOne({ where: { email } });
  // }
}
