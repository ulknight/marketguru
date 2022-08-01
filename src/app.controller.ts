import {Controller, Get, Post, Render, Res, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {Response} from 'express';
import {AuthService} from './auth/auth.service';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Get()
    @Render('index')
    root(@Res() res: Response) {
        return {message: 'Привет! Это тестовое задание Грузилова Алексея.'};
    }

    @Get('registration')
    @Render('registration')
    registration() {
        return {message: 'Регистрация'};
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
