import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuegosService } from './juegos.service';
import { JuegosController } from './juegos.controller';
import { Juego } from './juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego])],
  controllers: [JuegosController],
  providers: [JuegosService],
  exports: [TypeOrmModule],
})
export class JuegosModule {}
