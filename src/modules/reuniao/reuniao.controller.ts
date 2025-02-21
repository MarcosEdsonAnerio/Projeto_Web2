import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { Response } from 'express';
import { ReuniaoValidator } from './reuniao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('reunioes')
export class ReuniaoController {
    constructor(private readonly service: ReuniaoService) {}

    // Rota para listar todas as reuniões
    @Get()
    @Render('reuniao/index')
    async index() {
        return { reunioes: await this.service.getAll() };
    }

    // Rota para exibir o formulário de criação de uma nova reunião
    @Get('novo')
    @Render('reuniao/form')
    createForm() {
        return {};
    }

    // Rota para salvar os dados de cadastro de uma nova reunião
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new ReuniaoValidator().validate(dados);

            if (validador.isError) {
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

    // Rota para exibir o formulário de atualização de uma reunião existente
    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const reuniao = await this.service.findOneById(id);

            if (!reuniao) {
                setFlashErrors(request, ['A reunião selecionada não foi encontrada! Tente novamente.']);
                return response.redirect('/reunioes');
            }

            return response.render('reuniao/form', { reuniao });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/reunioes');
        }
    }

    // Rota para salvar os dados de atualização de uma reunião existente
    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new ReuniaoValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/reunioes/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);

                return response.redirect(`/reunioes`);
            }

        } catch {
            // Tratamento de erros genérico
        }

        return response.redirect('/reunioes');
    }

    // Rota para excluir uma reunião
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const reuniao = await this.service.findOneById(id);

            if (!reuniao) {
                setFlashErrors(request, ['A reunião selecionada não foi encontrada! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
        } finally {
            return response.redirect(`/reunioes`);
        }
    }
}