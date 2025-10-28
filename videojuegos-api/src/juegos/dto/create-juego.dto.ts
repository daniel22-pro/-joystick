import { ApiProperty } from '@nestjs/swagger';

export class CreateJuegoDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  genero: string;

  @ApiProperty()
  plataforma: string;

  @ApiProperty()
  fecha_lanzamiento: string;

  @ApiProperty()
  precio: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el juego',
  })
  categoriaId: number;
}
