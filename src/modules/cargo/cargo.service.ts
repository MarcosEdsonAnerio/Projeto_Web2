import { Injectable } from '@nestjs/common';
import { Cargo } from './cargo.entity';

@Injectable()
export class CargoService {
  async getAll() {
    return await Cargo.find();
  }

  async create(data: any) {
    const cargo = Cargo.create({ ...data });
    return await cargo.save();
  }
}