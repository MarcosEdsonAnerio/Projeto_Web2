import { Injectable } from '@nestjs/common';
import { Aluno } from './aluno.entity';

@Injectable()
export class AlunoService {
    async getAll() {
        return await Aluno.find({
            order: { nome: 'ASC' }
        });
    }

    async findOneById(id: number) {
        return await Aluno.findOne({ where: { id: id } });
    }

    async create(dados: any) {
        const aluno = Aluno.create({ ...dados });
        return await aluno.save();
    }

    async update(id: number, dados: any) {
        const aluno = await this.findOneById(id);

        if (!aluno) {
            return null;
        }

        return await Aluno.update(id, { ...dados });
    }

    async delete(id: number) {
        const aluno = await this.findOneById(id);

        if (!aluno) {
            return null;
        }

        return await Aluno.delete(id);
    }
}