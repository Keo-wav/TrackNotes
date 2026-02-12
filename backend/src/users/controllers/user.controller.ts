import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import { EditUserDto } from '../dto/user-edit.dto';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserWithCommentsDto } from '../dto/user-with-comments.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with their comment counts' })
  @ApiResponse({ status: 200, type: [UserDto] })
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return UserMapper.mapUserEntitiesToDtos(users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.findOneOrThrow(id);
    return UserMapper.mapUserEntityToDto(user);
  }

  /**
   * Optional: A "Profile" route if you want to see all comments made by this user
   */
  @Get(':id/full')
  @ApiOperation({ summary: 'Get user profile including full comment history' })
  @ApiResponse({ status: 200, type: UserWithCommentsDto })
  async getFullProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserWithCommentsDto> {
    const user = await this.userService.findFullProfileOrThrow(id);
    return UserMapper.mapUserEntityToDtoWithComments(user);
  }

  @Post()
  @ApiOperation({ summary: 'Register a new band member' })
  @ApiResponse({ status: 201, type: UserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userService.create(createUserDto);
    return UserMapper.mapUserEntityToDto(newUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user settings or role' })
  @ApiResponse({ status: 200, type: UserDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userService.update(id, editUserDto);
    return UserMapper.mapUserEntityToDto(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a user from the band' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
