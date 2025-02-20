import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Setor extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_setor' })
  id!: number;

  @Column({ name: 'nome_setor' })
  nome: string;
}