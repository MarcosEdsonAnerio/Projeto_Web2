import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_cargo' })
  id!: number;

  @Column({ name: 'nome_cargo' })
  nome: string;

  @Column({ name: 'descricao_cargo', nullable: true })
  descricao?: string;
}
