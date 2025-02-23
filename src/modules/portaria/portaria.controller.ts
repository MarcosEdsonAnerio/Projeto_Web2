import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { PortariaService } from './portaria.service';
import { Response } from 'express';
import { PortariaValidator } from './portaria.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('portarias')
export class PortariaController {
    constructor(private readonly service: PortariaService) { }

    @Get()
    @Render('portaria/index')
    async index() {
        return { portarias: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário
    @Get('nova')
    @Render('portaria/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
    @Post('nova')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new PortariaValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/portarias/nova');
            }

            await this.service.create(validador.getData);

        } catch (error) {
            setFlashErrors(request, ['Ocorreu um erro ao tentar salvar a portaria.']);
            return response.redirect('/portarias/nova');
        }

        return response.redirect('/portarias');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário
    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const portaria = await this.service.findOneById(id);

            if (!portaria) {
                setFlashErrors(request, ['A portaria selecionada não foi encontrada! Tente novamente.']);
                return response.redirect('/portarias');
            }

            return response.render('portaria/form', { portaria });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/portarias');
        }
    }

    // Rota para Salvar os dados de atualização
    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new PortariaValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/portarias/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);

                return response.redirect(`/portarias`);
            }

        } catch {
            setFlashErrors(request, ['Ocorreu um erro ao tentar atualizar a portaria.']);
            return response.redirect(`/portarias/${id}/atualizacao`);
        }

        return response.redirect('/portarias');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const portaria = await this.service.findOneById(id);

            if (!portaria) {
                setFlashErrors(request, ['A portaria selecionada não foi encontrada! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram excluídas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao tentar excluir a portaria.']);
        } finally {
            return response.redirect(`/portarias`);
        }
    }
}