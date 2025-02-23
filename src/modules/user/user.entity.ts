import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_usr' })
    id!: number;

    @Column({ name: 'nome_usr' })
    nome: string;

    @Column({ name: 'email_usr', unique: true })
    email: string;

    @Column({ name: 'senha_usr' })
    senha: string;

    @Column({ name: 'cargo_usr', nullable: true })
    cargo?: string;
}