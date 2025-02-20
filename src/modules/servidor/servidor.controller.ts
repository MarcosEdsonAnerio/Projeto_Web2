import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { ServidorService } from './servidor.service';
import { Response } from 'express';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { ServidorValidator } from './servidor.validator';


@Controller('servidores')
export class ServidorController {
    constructor(private readonly service: ServidorService) {}

    @Get()
    @Render('servidor/index')
    async index() {
        return { servidores: await this.service.getAll() };
        // return { servidores: [] };
    }

    //Rota de Cadastro
    //Abrir o formulario
    @Get('novo')
    @Render('servidor/form')
    createForm() {
        return {};
    }

    //Rota para Salvar os dados de cadastro
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {

        try {

            const validador = await new ServidorValidator().validate(dados);

            console.log(validador.isError, validador.getErrors, validador.getData)

            if(validador.isError) {
                setFlashErrors(request, validador.getErrors,)
                setOld(request, dados);

                return response.redirect('/servidores/novo')
            }

            await this.service.create(validador.getData);

        } catch (err){
            console.log(err);
        }

        return response.redirect('/servidores');
    }

    //Rota de Atualização (Update)
    //Abrir o formulario
    @Get(':id/atualizacao')
    @Render('servidor/form')
    updateForm() {
        return {};
    }
    //Rota para Salvar os dados de atualização

    //Rota de Confirmação de Exclusão (Update)
    //Abrir o formulario

    //Rota para Excluir
}

//criar um novo modulo
//npx nest g mo servidor modules

//criar um novo controller
//npx nest g co servidor modules

//criar um novo service
//npx nest g s servidor modules