import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component'
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service';
import { UsuarioDTO } from '../../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../../../services/usuario/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCard, BotonPrimarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {

  hide = true;
  error: string | null = null;
  // usuarioLogeado = new UsuarioDTO;
  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private usuarioService: UsuarioService

  ) { }

  navegarAInicio() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe({
        next: (response: any) => {
          if (!response.success || !response.data) {
            this.toastr.error(response.message || 'Credenciales incorrectas');
            return;
          }

          const usuario: UsuarioDTO = response.data;
          this.error = null;
          this.usuarioService.setUsuario(usuario);
          this.toastr.success('Bienvenido ' + usuario.nombre);
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          this.error = 'Error inesperado al iniciar sesión';
          this.toastr.error(this.error);
          console.error('Login error:', err);
        }
      });
    } else {
      this.toastr.warning('Debe ingresar su correo electrónico y contraseña');
    }
  }

  // clickEvent(event: MouseEvent) {
  // this.hide = !this.hide;
  // event.stopPropagation();
  // }
}


