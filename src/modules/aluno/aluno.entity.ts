import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_alu' })
  id!: number;

  @Column({ name: 'nome_alu' })
  nome: string;

  @Column({ name: 'cpf_alu' })
  cpf: string;

  @Column({ name: 'data_nascimento_alu' })
  dataNascimento: Date;

  @Column({ name: 'email_alu' })
  email: string;

  @Column({ name: 'telefone_alu' })
  telefone: string;
}