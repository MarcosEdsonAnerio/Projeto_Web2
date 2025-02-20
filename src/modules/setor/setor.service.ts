import { Injectable } from '@nestjs/common';
import { Setor } from './setor.entity';

@Injectable()
export class SetorService {
  // Método para buscar todos os setores
  async getAll() {
    return await Setor.find();
  }

  // Método para buscar um setor pelo ID
  async getById(id: number) {
    return await Setor.findOneBy({ id });
  }

  // Método para criar um novo setor
  async create(data: any) {
    const setor = Setor.create({ ...data });
    return await setor.save();
  }

  // Método para atualizar um setor existente
  async update(id: number, data: any) {
    await Setor.update(id, data);
    return await Setor.findOneBy({ id });
  }

  // Método para excluir um setor
  async delete(id: number) {
    await Setor.delete(id);
    return { deleted: true };
  }
}