import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';

@Module({
  controllers: [ReuniaoController],
  providers: [ReuniaoService],
})
export class ReuniaoModule {}