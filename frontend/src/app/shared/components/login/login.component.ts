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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCard, BotonPrimarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {

  hide = true;
  // usuarioLogeado = new UsuarioDTO;
  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService,

  ) { }



  navegarAInicio() {
    if (this.email && this.password) {
      this.toastr.success('Ingreso correcto')
      this.router.navigate(['/inicio']);
      // this.login(this.username, this.password);
    } else {
      this.toastr.warning('Debe ingresar su correo electrónico y contraseña');
    }

  }

  // clickEvent(event: MouseEvent) {
  // this.hide = !this.hide;
  // event.stopPropagation();
  // }
}


