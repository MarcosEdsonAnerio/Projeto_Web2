import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { SetorService } from './setor.service';
import { Response } from 'express';
import { SetorValidator } from './setor.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('setores')
export class SetorController {
    constructor(private readonly service: SetorService) { }

    // Listar todos os setores
    @Get()
    @Render('setor/index')
    async index() {
        return { setores: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário de criação
    @Get('novo')
    @Render('setor/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
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

        } catch (error) {
            setFlashErrors(request, ['Ocorreu um erro ao tentar salvar o setor.']);
            return response.redirect('/setores/novo');
        }

        return response.redirect('/setores');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário de edição
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

    // Rota para Salvar os dados de atualização
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
            setFlashErrors(request, ['Ocorreu um erro ao tentar atualizar o setor.']);
            return response.redirect(`/setores/${id}/atualizacao`);
        }

        return response.redirect('/setores');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const setor = await this.service.findOneById(id);

            if (!setor) {
                setFlashErrors(request, ['O setor selecionado não foi encontrado! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram excluídas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao tentar excluir o setor.']);
        } finally {
            return response.redirect(`/setores`);
        }
    }
}