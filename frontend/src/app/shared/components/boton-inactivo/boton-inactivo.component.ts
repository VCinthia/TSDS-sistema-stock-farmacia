import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-inactivo',
  imports: [],
  templateUrl: './boton-inactivo.component.html',
  styleUrl: './boton-inactivo.component.css'
})
export class BotonInactivoComponent {
    @Input() buttonText : string = "";
}
