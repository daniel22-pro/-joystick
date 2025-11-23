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

  // ============ MÉTODOS PARA EL CHATBOT ============

  // Obtener juegos más baratos
  async findCheapest(limit: number = 5): Promise<Juego[]> {
    return this.juegoRepo.find({
      order: { precio: 'ASC' },
      take: limit,
    });
  }

  // Buscar juegos por nombre
  async searchByName(nombre: string): Promise<Juego[]> {
    return this.juegoRepo
      .createQueryBuilder('juego')
      .where('LOWER(juego.nombre) LIKE LOWER(:nombre)', {
        nombre: `%${nombre}%`,
      })
      .getMany();
  }

  // Buscar juegos por género
  async findByGenre(genero: string): Promise<Juego[]> {
    return this.juegoRepo
      .createQueryBuilder('juego')
      .where('LOWER(juego.genero) LIKE LOWER(:genero)', {
        genero: `%${genero}%`,
      })
      .getMany();
  }

  // Buscar juegos por plataforma
  async findByPlatform(plataforma: string): Promise<Juego[]> {
    return this.juegoRepo
      .createQueryBuilder('juego')
      .where('LOWER(juego.plataforma) LIKE LOWER(:plataforma)', {
        plataforma: `%${plataforma}%`,
      })
      .getMany();
  }

  // Buscar juegos por rango de precio
  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Juego[]> {
    return this.juegoRepo
      .createQueryBuilder('juego')
      .where('juego.precio BETWEEN :min AND :max', {
        min: minPrice,
        max: maxPrice,
      })
      .orderBy('juego.precio', 'ASC')
      .getMany();
  }

  // Obtener estadísticas
  async getStats(): Promise<{
    total: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  }> {
    const result = (await this.juegoRepo
      .createQueryBuilder('juego')
      .select('COUNT(*)', 'total')
      .addSelect('AVG(juego.precio)', 'avgPrice')
      .addSelect('MIN(juego.precio)', 'minPrice')
      .addSelect('MAX(juego.precio)', 'maxPrice')
      .getRawOne()) as {
      total: string | number;
      avgPrice: string | number;
      minPrice: string | number;
      maxPrice: string | number;
    };

    return {
      total: parseInt(String(result.total)),
      avgPrice: parseFloat(String(result.avgPrice)) || 0,
      minPrice: parseFloat(String(result.minPrice)) || 0,
      maxPrice: parseFloat(String(result.maxPrice)) || 0,
    };
  }
}
