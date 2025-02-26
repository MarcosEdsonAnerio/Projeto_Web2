import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Response } from 'express';
import { AlunoValidator } from './aluno.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('alunos')
export class AlunoController {
    constructor(private readonly service: AlunoService) { }

    @Get()
    @Render('aluno/index')
    async index() {
        return { alunos: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário
    @Get('novo')
    @Render('aluno/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new AlunoValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/alunos/novo');
            }

            await this.service.create(validador.getData);

        } catch {
            setFlashErrors(request, ['Erro ao cadastrar aluno. Tente novamente.']);
        }

        return response.redirect('/alunos');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário
    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const aluno = await this.service.findOneById(id);

            if (!aluno) {
                setFlashErrors(request, ['O aluno selecionado não foi encontrado! Tente novamente.']);
                return response.redirect('/alunos');
            }

            return response.render('aluno/form', { aluno });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/alunos');
        }
    }

    // Rota para Salvar a atualização
    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new AlunoValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/alunos/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);
                return response.redirect(`/alunos`);
            }

        } catch {
            setFlashErrors(request, ['Erro ao atualizar aluno. Tente novamente.']);
        }

        return response.redirect('/alunos');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const aluno = await this.service.findOneById(id);

            if (!aluno) {
                setFlashErrors(request, ['O aluno selecionado não foi encontrado! Tente novamente.']);
                return response.redirect('/alunos');
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Erro ao excluir aluno. Tente novamente.']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao excluir o aluno.']);
        } finally {
            return response.redirect('/alunos');
        }
    }
}