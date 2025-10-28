import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { Juego } from './juego.entity';

@Controller('api/juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Get()
  findAll(): Promise<Juego[]> {
    return this.juegosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Juego> {
    return this.juegosService.findOne(id);
  }

  @Post()
  create(@Body() createJuegoDto: CreateJuegoDto): Promise<Juego> {
    return this.juegosService.create(createJuegoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJuegoDto: Partial<Juego>) {
    return this.juegosService.update(Number(id), updateJuegoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juegosService.remove(Number(id));
  }
}
