import { IsNotEmpty } from "class-validator";

export class PortariaDto {
  @IsNotEmpty({ message: 'O campo Número da Portaria é obrigatório' })
  numero: string;

  @IsNotEmpty({ message: 'O campo Descrição é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo Data de Emissão é obrigatório' })
  data_emissao: string;
}
