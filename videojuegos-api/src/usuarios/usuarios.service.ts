import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) throw new Error(`Usuario con id ${id} no encontrado`);
    return usuario;
  }

  // ✅ Nuevo método: buscar usuario por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  // ✅ Encriptar contraseña al crear usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);

    const nuevoUsuario = this.usuarioRepo.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });

    return await this.usuarioRepo.save(nuevoUsuario);
  }

  async update(id: number, updateUsuarioDto: Partial<Usuario>) {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) throw new Error(`Usuario con id ${id} no encontrado`);

    // Si se actualiza la contraseña, volver a encriptarla
    if (updateUsuarioDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        salt,
      );
    }

    Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepo.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }
    return await this.usuarioRepo.remove(usuario);
  }
}
