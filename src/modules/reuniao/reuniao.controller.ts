import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { Response } from 'express';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { ReuniaoValidator } from './reuniao.validator';

@Controller('reunioes')
export class ReuniaoController {
    constructor(private readonly service: ReuniaoService) {}

    @Get()
    @Render('reuniao/index')
    async index() {
        return { reunioes: await this.service.getAll() };
    }

    @Get('novo')
    @Render('reuniao/form')
    createForm() {
        return {};
    }

    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new ReuniaoValidator().validate(dados);

            if(validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/reunioes/novo');
            }

            await this.service.create(validador.getData);

        } catch (err) {
            console.log(err);
        }

        return response.redirect('/reunioes');
    }

    @Get(':id/atualizacao')
    @Render('reuniao/form')
    updateForm() {
        return {};
    }
}