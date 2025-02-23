import { Module } from '@nestjs/common';
import { ReuniaoController } from './reuniao.controller';
import { ReuniaoService } from './reuniao.service';

@Module({
  controllers: [ReuniaoController],
  providers: [ReuniaoService],
})
export class ReuniaoModule {}