import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { ServidorModule } from './modules/servidor/servidor.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { PortariaModule } from './modules/portaria/portaria.module';
import { ReuniaoModule } from './modules/reuniao/reuniao.module';
import { SetorModule } from './modules/setor/setor.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { DisciplinaModule } from './modules/disciplina/disciplina.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ServidorModule, CargoModule, PortariaModule, ReuniaoModule, SetorModule, AlunoModule, DisciplinaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
