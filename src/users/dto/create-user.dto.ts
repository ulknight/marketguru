import { IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {


    @IsEmail()
    email: string;

    phone: number;

    @IsNotEmpty()
    password: string;

    name: string;

    age: number;
}