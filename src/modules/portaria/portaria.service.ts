import { Injectable } from '@nestjs/common';
import { Portaria } from './portaria.entity';

@Injectable()
export class PortariaService {
    async getAll() {
        return await Portaria.find({
            order: { titulo: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Portaria.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const portaria = Portaria.create({ ...dados });

        return await portaria.save();
    }

    async update(id: number, dados: any) {
        const portaria = await this.findOneById(id);

        if (!portaria) {
            return null;
        }

        return await Portaria.update(id, { ...dados });
    }

    async delete(id: number) {
        const portaria = await this.findOneById(id);

        if (!portaria) {
            return null;
        }

        return await Portaria.delete(id);
    }
}