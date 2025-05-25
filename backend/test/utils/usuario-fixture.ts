import { faker } from '@faker-js/faker';
import { Usuario } from 'src/entities/usuario.entity';
import { Rol } from 'src/enums/rol.enum';

export function generarUsuarioEntidad(
  overrides?: Partial<Usuario>
): Usuario {
  const usuario = new Usuario();
  usuario.nombre = faker.person.fullName();
  usuario.email = faker.internet.email();
  usuario.password = faker.internet.password({ length: 8 });
  usuario.rol = Rol.ADMINISTRADOR;

  return Object.assign(usuario, overrides);
}

