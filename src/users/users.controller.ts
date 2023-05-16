import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    // @Post('register')
    // register(@Body() body: any)
    // {
    //     return this.userService.addUser();
    // }

    @Get('get-all-user')
    getUser()
    {
        return this.userService.getUsers();
    }

    @Get('get-user/:id')
    getUserById(@Param() id: number)
    {
        return this.userService.getUserById(id);
    }
}
