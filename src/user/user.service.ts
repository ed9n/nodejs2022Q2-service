import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/data';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user';

@Injectable()
export class UserService {
  getAll() {
    return dataBase;
  }

  getById(id: string) {
    return dataBase.find((el) => el.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.id = v4();
    user.createdAt = Math.floor(Date.now() / 1000);
    user.updatedAt = Math.floor(Date.now() / 1000);

    dataBase.push(user);

    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return dataBase.find((el) => {
      if (el.id === id && el.password === updatePasswordDto.oldPassword) {
        el.version++;
        el.password = updatePasswordDto.newPassword;
        el.updatedAt = Math.floor(Date.now() / 1000);
        return el;
      }
    });
  }

  removeUser(id: string) {
    const user = dataBase.find((el) => el.id === id);

    const index = dataBase.indexOf(user);

    if (index !== -1) {
      dataBase.splice(index, 1);
    }
  }
}
