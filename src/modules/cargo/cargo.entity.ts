import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_car' })
    id!: number;

    @Column({ name: 'nome_car' })
    nome: string;

    @Column({ name: 'descricao_car' })
    descricao: string;

    @Column({ name: 'salario_base_car', type: 'decimal', precision: 10, scale: 2 })
    salarioBase: number;

    @Column({ name: 'valor_beneficio_car', type: 'decimal', precision: 10, scale: 2, nullable: true })
    valorBeneficio?: number;

    @Column({ name: 'valor_bonus_car', type: 'decimal', precision: 10, scale: 2, nullable: true })
    valorBonus?: number;
}