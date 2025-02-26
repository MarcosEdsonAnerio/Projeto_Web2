import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsDateString, IsEmail } from "class-validator";

export class AlunoDto {
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @MinLength(11, { message: 'O CPF deve ter 11 caracteres' })
    cpf: string;

    @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
    @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida' })
    dataNascimento: string;

    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsEmail({}, { message: 'O email deve ser válido' })
    email: string;

    @IsNotEmpty({ message: 'O telefone é obrigatório' })
    telefone: string;
}

export class AlunoUpdateDto extends PartialType(AlunoDto) { }