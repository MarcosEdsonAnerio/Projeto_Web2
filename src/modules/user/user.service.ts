import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    async getAll() {
        return await User.find({
            order: { nome: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await User.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const user = User.create({ ...dados });

        return await user.save();
    }

    async update(id: number, dados: any) {
        const user = await this.findOneById(id);

        if (!user) {
            return null;
        }

        return await User.update(id, { ...dados });
    }

    async delete(id: number) {
        const user = await this.findOneById(id);

        if (!user) {
            return null;
        }

        return await User.delete(id);
    }
}