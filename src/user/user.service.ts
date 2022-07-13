import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user';

@Injectable()
export class UserService {
  private arrayUsers: User[] = [];

  getAll() {
    return this.arrayUsers;
  }

  getById(id: string) {
    return this.arrayUsers.find((el) => el.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.id = v4();
    user.createdAt = Math.floor(Date.now() / 1000);
    user.updatedAt = Math.floor(Date.now() / 1000);

    this.arrayUsers.push(user);

    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.arrayUsers.find((el) => {
      if (el.id === id && el.password === updatePasswordDto.oldPassword) {
        el.version++;
        el.password = updatePasswordDto.newPassword;
        el.updatedAt = Math.floor(Date.now() / 1000);
        return el;
      }
    });
  }

  removeUser(id: string) {
    const user = this.arrayUsers.find((el) => el.id === id);

    const index = this.arrayUsers.indexOf(user);

    if (index !== -1) {
      this.arrayUsers.splice(index, 1);
    }
  }
}
