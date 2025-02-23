import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength, IsDateString, IsOptional, IsNumber } from "class-validator";

export class ReuniaoDto {
    @IsNotEmpty({ message: 'O título da reunião é obrigatório' })
    @MinLength(5, { message: 'O título da reunião deve ter no mínimo 5 caracteres' })
    titulo: string;

    @IsNotEmpty({ message: 'A descrição da reunião é obrigatória' })
    @MinLength(10, { message: 'A descrição da reunião deve ter no mínimo 10 caracteres' })
    descricao: string;

    @IsNotEmpty({ message: 'A data da reunião é obrigatória' })
    @IsDateString({}, { message: 'A data da reunião deve ser uma data válida' })
    data: string;

    @IsNotEmpty({ message: 'O local da reunião é obrigatório' })
    local: string;

    @IsOptional()
    @IsNumber({}, { message: 'O ID do responsável deve ser um número válido' })
    responsavelId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'O ID do setor deve ser um número válido' })
    setorId?: number;
}

export class ReuniaoUpdateDto extends PartialType(ReuniaoDto) { }