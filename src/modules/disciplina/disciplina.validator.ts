import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { DisciplinaDto, DisciplinaUpdateDto } from "./disciplina.dto";

export class DisciplinaValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(DisciplinaUpdateDto, data));
        }

        return this.validator(plainToInstance(DisciplinaDto, data));
    }
}