// src/categorias/entities/categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Juego } from '../../juegos/juego.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Juego, (juego) => juego.categoria)
  juegos: Juego[];
}
