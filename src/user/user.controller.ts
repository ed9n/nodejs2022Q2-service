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
    const user = this.userService.getById(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (user === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  @Post()
  @Header('Accept', 'application/json')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Put(':id')
  @Header('Accept', 'application/json')
  async updateUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id,
  ) {
    const userId = this.userService.getById(id);
    const passowrd = this.userService.updatePassword(id, updatePasswordDto);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (userId === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    } else if (passowrd === undefined) {
      throw new HttpException('Old passowrd is wrong', HttpStatus.FORBIDDEN);
    } else {
      return passowrd;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  async removeUser(@Param('id') id) {
    const user = this.userService.getById(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (user === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.userService.removeUser(id);
  }
}
