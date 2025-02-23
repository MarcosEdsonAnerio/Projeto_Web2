import { Injectable } from '@nestjs/common';
import { Cargo } from './cargo.entity';

@Injectable()
export class CargoService {
    async getAll() {
        return await Cargo.find({
            order: { nome: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Cargo.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const cargo = Cargo.create({ ...dados });

        return await cargo.save();
    }

    async update(id: number, dados: any) {
        const cargo = await this.findOneById(id);

        if (!cargo) {
            return null;
        }

        return await Cargo.update(id, { ...dados });
    }

    async delete(id: number) {
        const cargo = await this.findOneById(id);

        if (!cargo) {
            return null;
        }

        return await Cargo.delete(id);
    }
}