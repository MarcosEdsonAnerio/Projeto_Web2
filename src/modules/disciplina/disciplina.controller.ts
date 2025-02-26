import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { Response } from 'express';
import { DisciplinaValidator } from './disciplina.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('disciplinas')
export class DisciplinaController {
    constructor(private readonly service: DisciplinaService) { }

    @Get()
    @Render('disciplina/index')
    async index() {
        return { disciplinas: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário
    @Get('novo')
    @Render('disciplina/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new DisciplinaValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/disciplinas/novo');
            }

            await this.service.create(validador.getData);

        } catch {
            setFlashErrors(request, ['Erro ao cadastrar disciplina. Tente novamente.']);
        }

        return response.redirect('/disciplinas');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário
    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const disciplina = await this.service.findOneById(id);

            if (!disciplina) {
                setFlashErrors(request, ['A disciplina selecionada não foi encontrada! Tente novamente.']);
                return response.redirect('/disciplinas');
            }

            return response.render('disciplina/form', { disciplina });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/disciplinas');
        }
    }

    // Rota para Salvar a atualização
    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new DisciplinaValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/disciplinas/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);
                return response.redirect(`/disciplinas`);
            }

        } catch {
            setFlashErrors(request, ['Erro ao atualizar disciplina. Tente novamente.']);
        }

        return response.redirect('/disciplinas');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const disciplina = await this.service.findOneById(id);

            if (!disciplina) {
                setFlashErrors(request, ['A disciplina selecionada não foi encontrada! Tente novamente.']);
                return response.redirect('/disciplinas');
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Erro ao excluir disciplina. Tente novamente.']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao excluir a disciplina.']);
        } finally {
            return response.redirect('/disciplinas');
        }
    }
}