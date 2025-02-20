import { IsNotEmpty } from 'class-validator';

export class SetorDto {
  @IsNotEmpty({ message: 'O campo Nome do Setor é obrigatório' })
  nome: string;
}