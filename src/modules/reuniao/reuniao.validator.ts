import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { ReuniaoDto, ReuniaoUpdateDto } from "./reuniao.dto";

export class ReuniaoValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(ReuniaoUpdateDto, data));
        }

        return this.validator(plainToInstance(ReuniaoDto, data));
    }
}