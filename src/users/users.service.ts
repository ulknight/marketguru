import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {UserInterface} from './interfaces/user.interface';
import {Op} from 'sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {
    }

    async findAll(page = 1, search?: string) {
        const pageSize = 5;
        const currentPage: number = +page;

        let where = {};
        if (search) {
            where = {
                [Op.or]: {
                    email: {
                        [Op.startsWith]: search
                    },
                    name: {
                        [Op.startsWith]: search
                    }
                }
            }
        }

        const users = await this.userModel.findAll({
            attributes: { exclude: ['password'] },
            where: where,
            raw: true,
            offset: pageSize*(currentPage-1),
            limit: pageSize
        });

        return {
            users: users,
            prev_page: currentPage-1,
            next_page: currentPage+1,
            search: search,
            page: currentPage
        }
    }

    async create(newData?: UserInterface) {
        return this.userModel.create(newData);
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async updateOne(id: string, data: UserInterface) {
        return this.userModel.update(data, {
            where: {
                id,
            },
        });
    }

    async deleteOne(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }

    async findByUserName(username: any): Promise<User | undefined> {
        return this.userModel.findOne({
            where: {
                [Op.or]: [
                    {email: username},
                    {phone: username}
                ]
            },
        });
    }
}
