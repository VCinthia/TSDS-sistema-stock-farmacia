import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { BotonSecundarioComponent } from '../boton-secundario/boton-secundario.component';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BotonInactivoComponent } from '../boton-inactivo/boton-inactivo.component';

@Component({
  selector: 'app-agregar-lote-form',
  imports: [MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatSelectModule, BotonPrimarioComponent, BotonSecundarioComponent, BotonInactivoComponent],
  templateUrl: './agregar-lote-form.component.html',
  styleUrl: './agregar-lote-form.component.css',
})
export class AgregarLoteFormComponent {

  constructor(
    public dialogRef: MatDialogRef<AgregarLoteFormComponent>,
    private router : Router,
    private toastr: ToastrService
  ) {}

  cantidad = new FormControl('', [Validators.required]);
  fechaVenc = new FormControl('', [Validators.required]);
  producto = new FormControl('', Validators.required);
  proveedor = new FormControl('', Validators.required);
  sucursal = new FormControl('', Validators.required);

  cerrarModal(){
    this.dialogRef.close();
  }

  agregarLote(){
    this.dialogRef.close();
    this.toastr.success('Lote agregado exitosamente');
  }
}
