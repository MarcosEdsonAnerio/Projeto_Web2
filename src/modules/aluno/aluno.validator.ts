import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { AlunoDto, AlunoUpdateDto } from "./aluno.dto";

export class AlunoValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(AlunoUpdateDto, data));
        }

        return this.validator(plainToInstance(AlunoDto, data));
    }
}