import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty({ required: false })
  descripcion?: string;
}
