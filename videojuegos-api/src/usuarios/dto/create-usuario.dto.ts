import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  nombre: string;

  @ApiProperty({
    example: 'juanperez@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña del usuario',
  })
  password: string;
}
