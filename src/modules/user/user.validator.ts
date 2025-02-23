import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { UserDto, UserUpdateDto } from "./user.dto";

export class UserValidator extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if (update) {
            return this.validator(plainToInstance(UserUpdateDto, data));
        }

        return this.validator(plainToInstance(UserDto, data));
    }
}