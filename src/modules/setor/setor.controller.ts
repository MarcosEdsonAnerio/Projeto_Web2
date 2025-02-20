import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { SetorService } from './setor.service';
import { SetorValidator } from './setor.validator';

@Controller('setores')
export class SetorController {
    constructor(private readonly service: SetorService) {}

    // Rota para listar todos os setores
    @Get()
    @Render('setor/index')
    async index() {
        return { setores: await this.service.getAll() };
    }

    // Rota para exibir o formulário de criação de um novo setor
    @Get('novo')
    @Render('setor/form')
    createForm() {
        return {};
    }

    // Rota para salvar os dados de cadastro de um novo setor
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new SetorValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);
                return response.redirect('/setores/novo');
            }

            await this.service.create(validador.getData);
        } catch (err) {
            console.log(err);
        }

        return response.redirect('/setores');
    }

    // Rota para exibir o formulário de atualização de um setor existente
    @Get(':id/atualizacao')
    @Render('setor/form')
    async updateForm(@Req() request) {
        const setor = await this.service.getById(request.params.id);
        return { setor };
    }

    // Rota para salvar os dados de atualização de um setor existente
    @Post(':id/atualizacao')
    async updateSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new SetorValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);
                return response.redirect(`/setores/${request.params.id}/atualizacao`);
            }

            await this.service.update(request.params.id, validador.getData);
        } catch (err) {
            console.log(err);
        }

        return response.redirect('/setores');
    }

    // Rota para excluir um setor
    @Post(':id/exclusao')
    async delete(@Req() request, @Res() response: Response) {
        await this.service.delete(request.params.id);
        return response.redirect('/setores');
    }
}