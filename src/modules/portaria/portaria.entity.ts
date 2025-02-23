import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portaria extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_por' })
    id!: number;

    @Column({ name: 'titulo_por' })
    titulo: string;

    @Column({ name: 'descricao_por' })
    descricao: string;

    @Column({ name: 'data_inicio_por' })
    dataInicio: Date;

    @Column({ name: 'data_termino_por', nullable: true })
    dataTermino?: Date;

    @Column({ name: 'local_por' })
    local: string;

    @Column({ name: 'responsavel_por' })
    responsavel: string;
}