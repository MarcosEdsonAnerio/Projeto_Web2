import { plainToInstance } from 'class-transformer';
import { BaseValidator } from 'src/common/validator/base.validator';
import { IValidator } from 'src/common/validator/interface.validator';
import { ReuniaoDto } from './reuniao.dto';

export class ReuniaoValidator extends BaseValidator implements IValidator {
  validate(data: any): Promise<this> {
    const dados = plainToInstance(ReuniaoDto, data);

    return this.validator(dados);
  }
}