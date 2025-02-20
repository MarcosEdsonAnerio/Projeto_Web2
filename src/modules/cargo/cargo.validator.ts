import { plainToInstance } from 'class-transformer';
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from 'src/common/validator/interface.validator';
import { CargoDto } from './cargo.dto';

export class CargoValidator extends BaseValidator implements IValidator {
  validate(data: any): Promise<this> {
    const dados = plainToInstance(CargoDto, data);
    return this.validator(dados);
  }
}