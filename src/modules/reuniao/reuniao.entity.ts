import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reuniao extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_reu' })
    id!: number;

    @Column({ name: 'titulo_reu' })
    titulo: string;

    @Column({ name: 'descricao_reu' })
    descricao: string;

    @Column({ name: 'data_reu' })
    data: Date;

    @Column({ name: 'local_reu' })
    local: string;

    @Column({ name: 'responsavel_reu' })
    responsavel: string;

    @Column({ name: 'setor_id_reu', nullable: true })
    setorId?: number;
}