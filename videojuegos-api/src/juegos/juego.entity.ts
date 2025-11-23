// entities/juego.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  imagen_url: string;
}
