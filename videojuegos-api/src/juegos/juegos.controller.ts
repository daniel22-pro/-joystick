import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { Juego } from './juego.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('api/juegos')
@UseGuards(JwtAuthGuard, RolesGuard) // 👈 protege todas las rutas con JWT + Roles
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  // 👇 Todos pueden ver los juegos
  @Get()
  findAll(): Promise<Juego[]> {
    return this.juegosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Juego> {
    return this.juegosService.findOne(id);
  }

  // 👇 Solo los administradores pueden crear
  @Post()
  @Roles('admin')
  create(@Body() createJuegoDto: CreateJuegoDto): Promise<Juego> {
    return this.juegosService.create(createJuegoDto);
  }

  // 👇 Solo los administradores pueden actualizar
  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateJuegoDto: Partial<Juego>) {
    return this.juegosService.update(Number(id), updateJuegoDto);
  }

  // 👇 Solo los administradores pueden eliminar
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.juegosService.remove(Number(id));
  }
}
