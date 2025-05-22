import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-primario',
  standalone: true,
  imports: [],
  templateUrl: './boton-primario.component.html',
  styleUrl: './boton-primario.component.css'
})
export class BotonPrimarioComponent {
 @Input() buttonText : string = "";
}
