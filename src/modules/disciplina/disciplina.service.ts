import { Injectable } from '@nestjs/common';
import { Disciplina } from './disciplina.entity';

@Injectable()
export class DisciplinaService {
    async getAll() {
        return await Disciplina.find({
            order: { nome: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Disciplina.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const disciplina = Disciplina.create({ ...dados });
        return await disciplina.save();
    }

    async update(id: number, dados: any) {
        const disciplina = await this.findOneById(id);

        if (!disciplina) {
            return null;
        }

        return await Disciplina.update(id, { ...dados });
    }

    async delete(id: number) {
        const disciplina = await this.findOneById(id);

        if (!disciplina) {
            return null;
        }

        return await Disciplina.delete(id);
    }
}