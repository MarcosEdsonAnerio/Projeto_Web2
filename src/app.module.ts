import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { ServidorModule } from './modules/servidor/servidor.module';
import {SetorModule} from "./modules/setor/setor.module";
import { PortariaModule } from './modules/portaria/portaria.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { ReuniaoModule } from './modules/reuniao/reuniao.module';
import { databaseProviders } from './database/database.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ServidorModule, SetorModule, PortariaModule, CargoModule, ReuniaoModule ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

