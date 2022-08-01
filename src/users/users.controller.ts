import {Controller, Get, Post, Delete, Body, Param, Render, Redirect} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './models/user.model';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    @Render('user')
    async getOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        return {user: user};
    }

    //@UseGuards(JwtAuthGuard)
    @Post(':id')
    @Render('user')
    async updateOne(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
        await this.usersService.updateOne(id, updateUser as User);
        const user = await this.usersService.findOne(id);
        return {user: user, message: 'Обновлено!'};
    }

    //@UseGuards(JwtAuthGuard)
    //По хорошему тут нужно использовать метод Put, но для этого нужно писать доп. JS интерфейс
    //@Put()
    @Post()
    @Redirect('/users')
    async create(@Body() createUser: CreateUserDto) {
        const user = await this.usersService.create(createUser as User);
        return {url: `/users/${user.id}`};
    }

    //@UseGuards(JwtAuthGuard)
    //По хорошему тут нужно использовать метод Delete, но для этого нужно писать доп. JS интерфейс
    //@Delete(':id')
    @Post('delete/:id')
    @Redirect('/')
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('all/:page')
    @Render('users')
    async getUsers(@Param('page') page: number) {
        return await this.usersService.findAll(page);
    }

    //@UseGuards(JwtAuthGuard)
    @Post('all/:page')
    @Render('users')
    async search(@Param('page') page: number, @Body('search') search: string) {
        return await this.usersService.findAll(page, search);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('all/:page/:search')
    @Render('users')
    async searchUsers(@Param('page') page: number, @Param('search') search: string) {
        return await this.usersService.findAll(page, search);
    }
}
