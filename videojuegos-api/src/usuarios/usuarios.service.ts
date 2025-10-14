import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

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

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = this.usuarioRepo.create(createUsuarioDto);
    return await this.usuarioRepo.save(nuevoUsuario);
  }

  async update(id: number, updateUsuarioDto: Partial<Usuario>) {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) {
      throw new Error(`Usuario con id ${id} no encontrado`);
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
