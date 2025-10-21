import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { Juego } from './juego.entity';

@ApiTags('juegos')
@Controller('juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo videojuego' })
  @ApiResponse({
    status: 201,
    description: 'El videojuego fue creado correctamente.',
  })
  create(@Body() createJuegoDto: CreateJuegoDto) {
    return this.juegosService.create(createJuegoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los videojuegos' })
  findAll() {
    return this.juegosService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un videojuego por ID' })
  update(@Param('id') id: string, @Body() updateJuegoDto: Partial<Juego>) {
    return this.juegosService.update(Number(id), updateJuegoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un videojuego por ID' })
  remove(@Param('id') id: string) {
    return this.juegosService.remove(Number(id));
  }
}
