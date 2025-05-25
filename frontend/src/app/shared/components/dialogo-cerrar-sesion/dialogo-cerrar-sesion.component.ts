import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule }      from '@angular/common';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-cerrar-sesion',
  standalone: true,
  imports: [MatDialogModule, CommonModule, BotonPrimarioComponent, BotonSecundarioComponent],
  templateUrl: './dialogo-cerrar-sesion.component.html',
  styleUrl: './dialogo-cerrar-sesion.component.css'
})
export class DialogoCerrarSesionComponent {
   constructor(public dialogRef: MatDialogRef<DialogoCerrarSesionComponent>) {}
}
