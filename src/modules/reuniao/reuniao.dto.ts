import { IsNotEmpty, IsDateString } from 'class-validator';

export class ReuniaoDto {
  @IsNotEmpty({ message: 'O campo Título é obrigatório' })
  titulo: string;

  @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
  descricao: string;

  @IsDateString({}, { message: 'O campo Data deve ser uma data válida' })
  data: Date;

  @IsNotEmpty({ message: 'O campo Local é obrigatório' })
  local: string;
}