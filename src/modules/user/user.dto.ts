import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsEmail, IsOptional } from "class-validator";

export class UserDto {
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({}, { message: 'O e-mail deve ser válido' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha: string;

    @IsOptional()
    @MinLength(5, { message: 'O cargo deve ter no mínimo 5 caracteres' })
    cargo?: string;
}

export class UserUpdateDto extends PartialType(UserDto) { }