import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsNumber, IsOptional } from "class-validator";

export class CargoDto {
    @IsNotEmpty({ message: 'O nome do cargo é obrigatório' })
    @MinLength(5, { message: 'O nome do cargo deve ter no mínimo 5 caracteres' })
    nome: string;

    @IsNotEmpty({ message: 'A descrição do cargo é obrigatória' })
    @MinLength(10, { message: 'A descrição do cargo deve ter no mínimo 10 caracteres' })
    descricao: string;

    @IsNotEmpty({ message: 'O salário base é obrigatório' })
    @IsNumber({}, { message: 'O salário base deve ser um número válido' })
    salarioBase: number;

    @IsOptional()
    @IsNumber({}, { message: 'O valor do benefício deve ser um número válido' })
    valorBeneficio?: number;

    @IsOptional()
    @IsNumber({}, { message: 'O valor do bônus deve ser um número válido' })
    valorBonus?: number;
}

export class CargoUpdateDto extends PartialType(CargoDto) { }