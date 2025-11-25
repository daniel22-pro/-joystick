import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: any) {
    return this.usuariosService.create(dto);
  }

  // ✅ Inicio de sesión
  async login(dto: { email: string; password: string }) {
    const usuario = await this.usuariosService.findByEmail(dto.email);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const valido = await bcrypt.compare(dto.password, usuario.password);

    if (!valido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }

  // ✅ Validar token y devolver usuario
  async validateUser(id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }
}
