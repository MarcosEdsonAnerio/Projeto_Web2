import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { Response } from 'express';
import { ReuniaoValidator } from './reuniao.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('reunioes')
export class ReuniaoController {
    constructor(private readonly service: ReuniaoService) { }

    // Listar todas as reuniões
    @Get()
    @Render('reuniao/index')
    async index() {
        return { reunioes: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário de criação
    @Get('nova')
    @Render('reuniao/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
    @Post('nova')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new ReuniaoValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/reunioes/nova');
            }

            await this.service.create(validador.getData);

        } catch (error) {
            setFlashErrors(request, ['Ocorreu um erro ao tentar salvar a reunião.']);
            return response.redirect('/reunioes/nova');
        }

        return response.redirect('/reunioes');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário de edição
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

    // Rota para Salvar os dados de atualização
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
            setFlashErrors(request, ['Ocorreu um erro ao tentar atualizar a reunião.']);
            return response.redirect(`/reunioes/${id}/atualizacao`);
        }

        return response.redirect('/reunioes');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const reuniao = await this.service.findOneById(id);

            if (!reuniao) {
                setFlashErrors(request, ['A reunião selecionada não foi encontrada! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram excluídas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao tentar excluir a reunião.']);
        } finally {
            return response.redirect(`/reunioes`);
        }
    }
}