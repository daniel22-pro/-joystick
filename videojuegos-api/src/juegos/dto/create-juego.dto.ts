import { ApiProperty } from '@nestjs/swagger';

export class CreateJuegoDto {
  @ApiProperty({ example: 'God of War Ragnarök' })
  nombre: string;

  @ApiProperty({ example: 'Acción y aventura' })
  genero: string;

  @ApiProperty({ example: 'PlayStation 5' })
  plataforma: string;

  @ApiProperty({
    example: '2022-11-09',
    description: 'Fecha de lanzamiento (YYYY-MM-DD)',
  })
  fecha_lanzamiento: string;

  @ApiProperty({ example: 250000, description: 'Precio del videojuego' })
  precio: number;
}
