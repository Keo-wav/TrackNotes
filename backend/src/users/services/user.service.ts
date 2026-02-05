import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditUserDto } from '../dto/user-edit.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.userRepository.findOneBy({ id_user: id } as any);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updatedUser: EditUserDto): Promise<User | null> {
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOneBy({ id_user: id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
