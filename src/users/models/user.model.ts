import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column
    email: string;

    @Column
    phone: number;

    @Column
    password: string;

    @Column
    name: string;

    @Column
    age: number;
}