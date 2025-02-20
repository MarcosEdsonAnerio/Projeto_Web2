import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { Response } from 'express';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { CargoValidator } from './cargo.validator';

@Controller('cargos')
export class CargoController {
  constructor(private readonly service: CargoService) {}

  @Get()
  @Render('cargo/index')
  async index() {
    return { cargos: await this.service.getAll() };
  }

  @Get('novo')
  @Render('cargo/form')
  createForm() {
    return {};
  }

  @Post('novo')
  async createSave(@Body() dados, @Res() response: Response, @Req() request) {
    try {
      const validador = await new CargoValidator().validate(dados);
      
      if (validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, dados);
        return response.redirect('/cargos/novo');
      }

      await this.service.create(validador.getData);
    } catch (err) {
      console.log(err);
    }

    return response.redirect('/cargos');
  }
}