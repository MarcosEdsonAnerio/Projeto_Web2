import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsNumber, IsOptional } from "class-validator";

export class SetorDto {
    @IsNotEmpty({ message: 'O nome do setor é obrigatório' })
    @MinLength(5, { message: 'O nome do setor deve ter no mínimo 5 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'A descrição do setor é obrigatória' })
    @MinLength(10, { message: 'A descrição do setor deve ter no mínimo 10 caracteres' })
    descricao: string;

    @IsOptional()
    @IsNumber({}, { message: 'O ID do responsável deve ser um número válido' })
    responsavelId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'O ID do setor pai deve ser um número válido' })
    setorPaiId?: number;
}

export class SetorUpdateDto extends PartialType(SetorDto) { }