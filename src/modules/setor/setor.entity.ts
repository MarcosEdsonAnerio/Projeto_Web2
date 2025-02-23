import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Setor extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_set' })
    id!: number;

    @Column({ name: 'nome_set' })
    nome: string;

    @Column({ name: 'descricao_set' })
    descricao: string;

    @Column({ name: 'responsavel_id_set', nullable: true })
    responsavelId?: number;

    @Column({ name: 'setor_pai_id_set', nullable: true })
    setorPaiId?: number;
}