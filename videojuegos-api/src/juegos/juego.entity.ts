// juego.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../categorias/entities/categoria.entity';

@Entity()
export class Juego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @Column()
  plataforma: string;

  @Column({ type: 'date' })
  fecha_lanzamiento: string;

  @Column('int')
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.juegos, { eager: true })
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;
}
