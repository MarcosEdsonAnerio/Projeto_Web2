import { Injectable } from '@nestjs/common';
import { Reuniao } from './reuniao.entity';

@Injectable()
export class ReuniaoService {
  async getAll() {
    return await Reuniao.find();
  }

  async create(data: any) {
    const reuniao = Reuniao.create({ ...data });

    return await reuniao.save();
  }
}