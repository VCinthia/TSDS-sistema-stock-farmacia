import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCard} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {BotonPrimarioComponent} from '../boton-primario/boton-primario.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCard, BotonPrimarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}


// clickEvent(event: MouseEvent) {
//   this.hide = !this.hide;
//   event.stopPropagation();
// }