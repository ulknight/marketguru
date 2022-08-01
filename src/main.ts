import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    const config = new DocumentBuilder()
        .setTitle('Marketguru test')
        .setDescription('Marketguru test exercise of Gruzilov Alexey')
        .setVersion('1.0')
        .addTag('Margketguru')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();