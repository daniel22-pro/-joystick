export class RegisterDto {
  nombre: string;
  correo: string;
  contrasena: string;
  rol?: string; // opcional (por defecto será 'user')
}
