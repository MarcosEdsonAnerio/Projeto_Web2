import { plainToInstance } from "class-transformer";
import { Validator } from "class-validator";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { PortariaDto } from "./portaria.DTO";

export class PortariaValidator extends BaseValidator implements IValidator {
    validate(data: any): Promise<this> {
        const dados = plainToInstance(PortariaDto, data);
        return this.validator(dados);
    }
}
