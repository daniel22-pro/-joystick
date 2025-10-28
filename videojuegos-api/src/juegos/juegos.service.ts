import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './juego.entity';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class JuegosService {
  constructor(
    @InjectRepository(Juego)
    private readonly juegoRepo: Repository<Juego>,

    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>, // 👈 necesario para buscar la categoría
  ) {}

  findAll(): Promise<Juego[]> {
    // Incluimos la categoría en la respuesta
    return this.juegoRepo.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Juego> {
    const juego = await this.juegoRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!juego) throw new NotFoundException(`Juego con id ${id} no encontrado`);
    return juego;
  }

  async create(createJuegoDto: CreateJuegoDto) {
    const categoria = await this.categoriaRepo.findOneBy({
      id: createJuegoDto.categoriaId,
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const nuevoJuego = this.juegoRepo.create({
      ...createJuegoDto,
      categoria,
    });

    return await this.juegoRepo.save(nuevoJuego);
  }

  async update(id: number, updateJuegoDto: Partial<Juego>) {
    const juego = await this.juegoRepo.findOneBy({ id });
    if (!juego) {
      throw new NotFoundException(`Juego con id ${id} no encontrado`);
    }

    Object.assign(juego, updateJuegoDto);
    return await this.juegoRepo.save(juego);
  }

  async remove(id: number) {
    const juego = await this.juegoRepo.findOneBy({ id });
    if (!juego) {
      throw new NotFoundException(`Juego con id ${id} no encontrado`);
    }

    return await this.juegoRepo.remove(juego);
  }
}
