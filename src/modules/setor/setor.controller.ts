import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { SetorService } from './setor.service';
import { Response } from 'express';
import { SetorValidator } from './setor.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('setores')
export class SetorController {
    constructor(private readonly service: SetorService) { }

    @Get()
    @Render('setor/index')
    async index() {
        return { setores: await this.service.getAll() };
    }

    @Get('novo')
    @Render('setor/form')
    createForm() {
        return {};
    }

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

        } catch {
            // Tratamento de erros genérico
        }

        return response.redirect('/setores');
    }

    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const setor = await this.service.findOneById(id);

            if (!setor) {
                setFlashErrors(request, ['O setor selecionado não foi encontrado! Tente novamente.']);
                return response.redirect('/setores');
            }

            return response.render('setor/form', { setor });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/setores');
        }
    }

    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new SetorValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/setores/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);

                return response.redirect(`/setores`);
            }

        } catch {
            // Tratamento de erros genérico
        }

        return response.redirect('/setores');
    }

    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const setor = await this.service.findOneById(id);

            if (!setor) {
                setFlashErrors(request, ['O setor selecionado não foi encontrado! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
        } finally {
            return response.redirect(`/setores`);
        }
    }
}