import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsDateString, IsOptional } from "class-validator";

export class PortariaDto {
    @IsNotEmpty({ message: 'O título é obrigatório' })
    @MinLength(5, { message: 'O título deve ter no mínimo 5 caracteres' })
    titulo: string;

    @IsNotEmpty({ message: 'A descrição é obrigatória' })
    @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
    descricao: string;

    @IsNotEmpty({ message: 'A data de início é obrigatória' })
    @IsDateString({}, { message: 'A data de início deve ser uma data válida' })
    dataInicio: string;

    @IsOptional()
    @IsDateString({}, { message: 'A data de término deve ser uma data válida' })
    dataTermino?: string;

    @IsNotEmpty({ message: 'O local é obrigatório' })
    local: string;

    @IsNotEmpty({ message: 'O responsável é obrigatório' })
    responsavel: string;
}

export class PortariaUpdateDto extends PartialType(PortariaDto) { }