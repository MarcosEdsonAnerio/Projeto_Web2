import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserValidator } from './user.validator';
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    @Render('user/index')
    async index() {
        return { users: await this.service.getAll() };
    }

    @Get('novo')
    @Render('user/form')
    createForm() {
        return {};
    }

    @Post('novo')
    async createSave(@Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new UserValidator().validate(dados);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect('/users/novo');
            }

            await this.service.create(validador.getData);

        } catch (error) {
            setFlashErrors(request, ['Ocorreu um erro ao tentar salvar o usuário.']);
            return response.redirect('/users/novo');
        }

        return response.redirect('/users');
    }

    @Get(':id/atualizacao')
    async updateForm(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const user = await this.service.findOneById(id);

            if (!user) {
                setFlashErrors(request, ['O usuário selecionado não foi encontrado! Tente novamente.']);
                return response.redirect('/users');
            }

            return response.render('user/form', { user });
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao buscar informações.']);
            return response.redirect('/users');
        }
    }

    @Post(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() dados, @Res() response: Response, @Req() request) {
        try {
            const validador = await new UserValidator().validate(dados, true);

            if (validador.isError) {
                setFlashErrors(request, validador.getErrors);
                setOld(request, dados);

                return response.redirect(`/users/${id}/atualizacao`);
            }

            const result = await this.service.update(id, validador.getData);

            if (!result) {
                setFlashErrors(request, ['Informações não foram atualizadas! Tente novamente']);

                return response.redirect(`/users`);
            }

        } catch {
            setFlashErrors(request, ['Ocorreu um erro ao tentar atualizar o usuário.']);
            return response.redirect(`/users/${id}/atualizacao`);
        }

        return response.redirect('/users');
    }

    @Get(':id/exclusao')
    async delete(@Param('id') id: number, @Res() response: Response, @Req() request) {
        try {
            const user = await this.service.findOneById(id);

            if (!user) {
                setFlashErrors(request, ['O usuário selecionado não foi encontrado! Tente novamente.']);
            }

            const result = await this.service.delete(id);

            if (!result) {
                setFlashErrors(request, ['Informações não foram excluídas! Tente novamente']);
            }
        } catch {
            setFlashErrors(request, ['Ocorreram erros ao tentar excluir o usuário.']);
        } finally {
            return response.redirect(`/users`);
        }
    }
}