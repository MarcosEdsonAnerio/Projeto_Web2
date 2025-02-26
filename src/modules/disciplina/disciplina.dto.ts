import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength } from "class-validator";

export class DisciplinaDto {
    @IsNotEmpty({ message: 'O nome da disciplina é obrigatório' })
    @MinLength(5, { message: 'O nome da disciplina deve ter no mínimo 5 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'O código da disciplina é obrigatório' })
    codigo: string;

    @IsNotEmpty({ message: 'A carga horária é obrigatória' })
    cargaHoraria: number;
}

export class DisciplinaUpdateDto extends PartialType(DisciplinaDto) { }