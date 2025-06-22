import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ClienteDTO } from '../../../../core/dtos/cliente.dto';
import { ClienteService } from '../../../../services/cliente/cliente.service';


@Component({
  selector: 'app-fidelizacion-clientes',
  imports: [MatCard, MatCardContent, MatFormFieldModule, MatInputModule, BotonPrimarioComponent, MatTableModule, MatProgressSpinnerModule, CommonModule, FormsModule],
  templateUrl: './fidelizacion-clientes.component.html',
  styleUrl: './fidelizacion-clientes.component.css'
})
export class FidelizacionClientesComponent implements OnInit {

  clientes: ClienteDTO[] = []
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  clientesFiltrados: ClienteDTO[] = [];


  columnas: string[] = ['idCliente', 'nombre', 'categoria', 'puntos_fidelizacion'];


  constructor(
    private clienteService: ClienteService, private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.clienteService.obtenerClientesFidelizacion().subscribe({
      next: (response) => {
        this.clientes = response.data;
        this.clientesFiltrados = this.clientes;

        this.categorias = [...new Set(
          this.clientes.map(c => c.categoria).filter((cat): cat is string => !!cat)
        )];
      },
      error: (err) => {
        console.error('Error al obtener los clientes', err);
      }
    });
  }

  filtrarPorCategoria() {
  if (!this.categoriaSeleccionada) {
    this.clientesFiltrados = this.clientes;
  } else {
    this.clientesFiltrados = this.clientes.filter(
      cliente => cliente.categoria === this.categoriaSeleccionada
    );
  }
}

  exportarPDF() {
    this.toastr.success('PDF exportado éxitosamente')
  }

  enviarPromociones() {
    this.toastr.success('Promociones enviadas éxitosamente')
  }
}
