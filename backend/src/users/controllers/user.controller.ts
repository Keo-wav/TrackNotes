import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import { EditUserDto } from '../dto/user-edit.dto';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserDto,
  })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return UserMapper.mapUserEntityToDto(await this.userService.findOne(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserDto,
    isArray: true,
  })
  async getAll(): Promise<UserDto[]> {
    return UserMapper.mapUserEntitiesToDtos(await this.userService.findAll());
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDto,
  })
  async create(@Body() userData: CreateUserDto): Promise<UserDto> {
    return UserMapper.mapUserEntityToDto(
      await this.userService.create(userData),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 201,
    description: 'User updated successfully',
    type: UserDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: EditUserDto,
  ): Promise<UserDto> {
    return UserMapper.mapUserEntityToDto(
      await this.userService.update(id, updatedUser),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: `User deleted successfully`,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
