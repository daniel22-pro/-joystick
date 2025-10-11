import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './juego.entity';
import { CreateJuegoDto } from './dto/create-juego.dto';

@Injectable()
export class JuegosService {
  constructor(
    @InjectRepository(Juego)
    private readonly juegoRepo: Repository<Juego>,
  ) {}

  findAll(): Promise<Juego[]> {
    return this.juegoRepo.find();
  }

  async findOne(id: number): Promise<Juego> {
    const juego = await this.juegoRepo.findOneBy({ id });
    if (!juego) throw new NotFoundException(`Juego con id ${id} no encontrado`);
    return juego;
  }

  async create(createJuegoDto: CreateJuegoDto) {
    const nuevoJuego = this.juegoRepo.create(createJuegoDto);
    return await this.juegoRepo.save(nuevoJuego);
  }

  async update(id: number, updateJuegoDto: Partial<Juego>) {
    const juego = await this.juegoRepo.findOneBy({ id });
    if (!juego) {
      throw new Error(`Juego con id ${id} no encontrado`);
    }

    Object.assign(juego, updateJuegoDto);
    return await this.juegoRepo.save(juego);
  }

  async remove(id: number) {
    const juego = await this.juegoRepo.findOneBy({ id });
    if (!juego) {
      throw new Error(`Juego con id ${id} no encontrado`);
    }

    return await this.juegoRepo.remove(juego);
  }
}
