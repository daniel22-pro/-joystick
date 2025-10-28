import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuegosService } from './juegos.service';
import { JuegosController } from './juegos.controller';
import { Juego } from './juego.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego, Categoria])],
  controllers: [JuegosController],
  providers: [JuegosService],
})
export class JuegosModule {}
