import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Get()
  @Header('Content-Type', 'application/json')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Get(':id')
  @Header('Accept', 'application/json')
  async getById(@Param('id') id) {
    const user = await this.userService.getById(id);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  @Post()
  @Header('Accept', 'application/json')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Put(':id')
  @Header('Accept', 'application/json')
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id,
  ) {
    const passowrd = await this.userService.updatePassword(
      id,
      updatePasswordDto,
    );

    return passowrd;
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  async removeUser(@Param('id') id) {
    return this.userService.removeUser(id);
  }
}
