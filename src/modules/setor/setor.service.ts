import { Injectable } from '@nestjs/common';
import { Setor } from './setor.entity';

@Injectable()
export class SetorService {
    async getAll() {
        return await Setor.find({
            order: { nome: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Setor.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const setor = Setor.create({ ...dados });

        return await setor.save();
    }

    async update(id: number, dados: any) {
        const setor = await this.findOneById(id);

        if (!setor) {
            return null;
        }

        return await Setor.update(id, { ...dados });
    }

    async delete(id: number) {
        const setor = await this.findOneById(id);

        if (!setor) {
            return null;
        }

        return await Setor.delete(id);
    }
}