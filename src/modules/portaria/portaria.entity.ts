import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Portaria extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_por', type: 'int' })
    id: number;

    @Column({ name: 'numero_por', type: 'text' })
    titulo: string;

    @Column({ name: 'descricao_por', type: 'text' })
    descricao: string;

    @Column({ name: 'data_emissao', type: 'date' })
    dataEmissao: Date;
}