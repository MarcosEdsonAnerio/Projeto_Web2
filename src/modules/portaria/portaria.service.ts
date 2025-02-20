import { Injectable } from '@nestjs/common';
import { Portaria } from 'src/modules/portaria/portaria.entity';

@Injectable()
export class PortariaService {
    async getAll() {
        return await Portaria.find();
    }

    async create(data: Partial<Portaria>) {
        const portaria = Portaria.create(data);
        return await portaria.save();
    }

    async update(id: number, data: Partial<Portaria>) {
        await Portaria.update(id, data);
        return await Portaria.findOneBy({ id });
    }

    async delete(id: number) {
        await Portaria.delete(id);
        return { deleted: true };
    }
}