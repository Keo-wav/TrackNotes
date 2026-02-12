import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-create.dto';
import { EditUserDto } from '../dto/user-edit.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneOrThrow(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.commentCount', 'user.comments')
      .where('user.id_user = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.commentCount', 'user.comments')
      .getMany();
  }

  async create(dto: CreateUserDto): Promise<User> {
    // TODO : hash password
    const newUser = this.userRepository.create(dto);
    const saved = await this.userRepository.save(newUser);
    return this.findOneOrThrow(saved.id_user);
  }

  async update(id: number, dto: EditUserDto): Promise<User> {
    const user = await this.findOneOrThrow(id);
    this.userRepository.merge(user, dto);
    await this.userRepository.save(user);
    return this.findOneOrThrow(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneOrThrow(id);
    await this.userRepository.remove(user);
  }
}
