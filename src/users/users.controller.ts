import { Request, Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '../jwt/jwt.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('add-user')
    insertUser(@Body() body: any)
    {
        return this.userService.addUser(body);
    }

    @Post('login')
    loginUser(@Body() body: any)
    {
        return this.userService.loginUser(body);
    }

    @Post('update-user')
    updateUser(@Body() body: any)
    {
        return this.userService.updateUser(body);
    }

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

    @Delete('delete-user')
    deleteById(@Body() body: any)
    {
        return this.userService.deleteUser(body.id);
    }

    @Get('profile')
    getProfile(@Request() req)
    {
        return this.userService.getProfile(req);
    }
}
