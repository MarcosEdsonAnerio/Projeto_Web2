import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disciplina extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_dis' })
  id!: number;

  @Column({ name: 'nome_dis' })
  nome: string;

  @Column({ name: 'codigo_dis' })
  codigo: string;

  @Column({ name: 'carga_horaria_dis' })
  cargaHoraria: number;
}