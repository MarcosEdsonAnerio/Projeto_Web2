import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { CargoDto, CargoUpdateDto } from "./cargo.dto";

export class CargoValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(CargoUpdateDto, data));
        }

        return this.validator(plainToInstance(CargoDto, data));
    }
}