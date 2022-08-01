import {Optional} from 'sequelize';

interface UserAttributes {
    email: string;
    phone: number;
    password: string;
    name: string;
    age: number;
}

export interface UserInterface extends Optional<UserAttributes,
    'email' | 'phone' | 'password' | 'name' | 'age'> {
}


/*
CREATE TABLE "Users" (
	id serial PRIMARY KEY,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE,
	name VARCHAR ( 50 ),
	phone VARCHAR ( 50 ) UNIQUE,
	age INT,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
 */