import { Injectable } from '@nestjs/common';
import { Reuniao } from './reuniao.entity';

@Injectable()
export class ReuniaoService {
    async getAll() {
        return await Reuniao.find({
            order: { titulo: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Reuniao.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const reuniao = Reuniao.create({ ...dados });

        return await reuniao.save();
    }

    async update(id: number, dados: any) {
        const reuniao = await this.findOneById(id);

        if (!reuniao) {
            return null;
        }

        return await Reuniao.update(id, { ...dados });
    }

    async delete(id: number) {
        const reuniao = await this.findOneById(id);

        if (!reuniao) {
            return null;
        }

        return await Reuniao.delete(id);
    }
}