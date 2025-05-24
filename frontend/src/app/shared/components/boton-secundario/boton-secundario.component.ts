import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-secundario',
  standalone: true,
  imports: [],
  templateUrl: './boton-secundario.component.html',
  styleUrl: './boton-secundario.component.css'
})
export class BotonSecundarioComponent {
 @Input() buttonText : string = "";
}
