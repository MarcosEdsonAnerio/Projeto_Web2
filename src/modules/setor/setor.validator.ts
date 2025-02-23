import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { SetorDto, SetorUpdateDto } from "./setor.dto";

export class SetorValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(SetorUpdateDto, data));
        }

        return this.validator(plainToInstance(SetorDto, data));
    }
}