import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './create-user';

type User = CreateUserDto & { id: number };

@Controller('users')
export class UsersController {
  private users: User[] = [];
  private idCounter = 1;

  @Get()
  findAll() {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.find((u) => u.id === +id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    const user: User = { id: this.idCounter++, ...dto };
    this.users.push(user);
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateUserDto) {
    const user = this.users.find((u) => u.id === +id);
    if (!user) return { message: 'Not found' };
    return Object.assign(user, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.users = this.users.filter((u) => u.id !== +id);
    return { deleted: true };
  }
}
