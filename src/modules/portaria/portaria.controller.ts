import { Controller, Get, Post, Body, Param, Render, Delete, Put } from '@nestjs/common';
import { PortariaService } from './portaria.service';

@Controller('portarias')
export class PortariaController {
    constructor(private readonly service: PortariaService) {}

    @Get()
    @Render('portaria/index')
    async index() {
        return { portarias: await this.service.getAll() };
    }

    @Get('novo')
    @Render('portaria/form')
    createForm() {
        return {};
    }

    @Post('novo')
    async createSave(@Body() body: any) {
        await this.service.create(body);
        return { message: 'Portaria criada com sucesso!' };
    }

    @Get(':id/atualizacao')
    @Render('portaria/form')
    async updateForm(@Param('id') id: number) {
        const portaria = await this.service.getAll().then(portarias => portarias.find(p => p.id === id));
        return { portaria };
    }

    @Put(':id/atualizacao')
    async updateSave(@Param('id') id: number, @Body() body: any) {
        await this.service.update(id, body);
        return { message: 'Portaria atualizada com sucesso!' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.service.delete(id);
        return { message: 'Portaria excluída com sucesso!' };
    }
}
