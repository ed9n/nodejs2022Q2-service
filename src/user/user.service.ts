import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4, validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async getById(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return user.toResponse();
    }
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create({
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Math.round(new Date().getTime()),
      updatedAt: Math.round(new Date().getTime()),
    });

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const updatePassword = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!updatePassword) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else if (updatePassword.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old passowrd is wrong');
    } else {
      updatePassword.password = updatePasswordDto.newPassword;
      updatePassword.version++;
      updatePassword.createdAt = Number(updatePassword.createdAt);
      updatePassword.updatedAt = Math.round(new Date().getTime());

      return await (
        await this.userRepository.save(updatePassword)
      ).toResponse();
    }
  }

  async removeUser(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }
}
