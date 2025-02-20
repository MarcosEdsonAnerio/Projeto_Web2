import { IsNotEmpty } from 'class-validator';

export class CargoDto {
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  nome: string;
}
