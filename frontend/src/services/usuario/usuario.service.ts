import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioDTO } from '../../core/dtos/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<UsuarioDTO | null>(this.getFromLocalStorage());
  usuario$ = this.usuarioSubject.asObservable();

  private getFromLocalStorage(): UsuarioDTO | null {
    const json = localStorage.getItem('usuario');
    return json ? JSON.parse(json) : null;
  }

  setUsuario(usuario: UsuarioDTO) {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  getUsuarioActual(): UsuarioDTO | null {
    return this.usuarioSubject.value;
  }
}
