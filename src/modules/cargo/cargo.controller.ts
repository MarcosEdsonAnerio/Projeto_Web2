import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { Response } from 'express';
import { CargoValidator } from './cargo.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('cargos')
export class CargoController {
    constructor(private readonly service: CargoService) { }

    // Listar todos os cargos
    @Get()
    @Render('cargo/index')
    async index() {
        return { cargos: await this.service.getAll() };
    }

    // Rota de Cadastro
    // Abrir o formulário de criação
    @Get('novo')
    @Render('cargo/form')
    createForm() {
        return {};
    }

    // Rota para Salvar os dados de cadastro
    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new CargoValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/cargos/novo');
            }

            await this.service.create(validador.getData);

        } catch (error) {
            setFlashErrors(request, ['Ocorreu um erro ao tentar salvar o cargo.']);
            return response.redirect('/cargos/novo');
        }

        return response.redirect('/cargos');
    }

    // Rota de Atualização (Update)
    // Abrir o formulário de edição
    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const cargo = await this.service.findOneById(id);

            if (!cargo) {
                setFlashErrors(request, ['O cargo selecionado não foi encontrado! Tente novamente.']);
                return response.redirect('/cargos');
            }

            return response.render('cargo/form', { cargo });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/cargos');
        }
    }

    // Rota para Salvar os dados de atualização
    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new CargoValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/cargos/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);

                return response.redirect(`/cargos`);
            }

        } catch {
            setFlashErrors(request, ['Ocorreu um erro ao tentar atualizar o cargo.']);
            return response.redirect(`/cargos/${id}/atualizacao`);
        }

        return response.redirect('/cargos');
    }

    // Rota de Exclusão (Delete)
    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const cargo = await this.service.findOneById(id);

            if (!cargo) {
                setFlashErrors(request, ['O cargo selecionado não foi encontrado! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram excluídas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao tentar excluir o cargo.']);
        } finally {
            return response.redirect(`/cargos`);
        }
    }
}