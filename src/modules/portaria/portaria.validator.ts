import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { PortariaDto, PortariaUpdateDto } from "./portaria.dto";

export class PortariaValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(PortariaUpdateDto, data));
        }

        return this.validator(plainToInstance(PortariaDto, data));
    }
}