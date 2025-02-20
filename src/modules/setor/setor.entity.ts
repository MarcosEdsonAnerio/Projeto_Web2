import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('setor')
export class Setor extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_set' })
  id!: number;

  @Column({ name: 'nome_set' })
  nome: string;

  @Column({ name: 'id_cam_fk' })
  idCamFk: number;
}