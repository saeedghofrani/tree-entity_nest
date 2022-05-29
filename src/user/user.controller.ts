import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: Object) {
    return await this.userService.createUser({
      body,
    });
  }

  @Post('findAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('findParrents')
  async findParrents() {
    return await this.userService.findParrents();
  }

  @Post('findChild')
  async findChild(@Body() body: any) {
    return this.userService.findChild(body.id);
  }

  @Post('findParrent')
  async findParrent(@Body() body: any) {
    return this.userService.findParrent(body.id);
  }
}
