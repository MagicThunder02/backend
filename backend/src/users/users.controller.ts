import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { UserDto } from 'src/database/dto/user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }


  @Post('create')
  async create(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto)
  }

  @Post('update')
  async update(@Body() userDto: UserDto) {

    return await this.userService.updateUser(userDto)
  }

  @Post('delete')
  async delete(@Body() body) {

    return await this.userService.deleteUser(body);
  }

}
