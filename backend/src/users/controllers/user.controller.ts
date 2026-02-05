import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import { EditUserDto } from '../dto/user-edit.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  update(@Param('id') id: string, @Body() updatedUser: EditUserDto) {
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userService.update(+id, updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
