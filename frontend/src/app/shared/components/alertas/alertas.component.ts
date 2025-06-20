import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { ToastrService } from 'ngx-toastr';
import { LoteService } from '../../../../services/lote/lote.service';
import { ProductoDTO } from '../../../../core/dtos/producto.dto';
import { LoteDTO } from '../../../../core/dtos/lote.dto';
import { ProductoService } from '../../../../services/producto/producto.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule, CommonModule, BotonPrimarioComponent],

  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})


export class AlertasComponent implements OnInit {

  lotesAVencer: LoteDTO[] = [];
  productosStockCritico: ProductoDTO[] = [];
  productosMasVendidos: ProductoDTO[] = [];
  idSucursalEmpleado: number | undefined;
  displayedColumns_vencimiento = ['codigo', 'nombre', 'stock', 'vencimiento', 'lote'];
  displayedColumns_stock_critico= ['categoria', 'nombre', 'stock'];
  displayedColumns_mas_vendidos= ['categoria', 'nombre', 'cantidad'];

  panelVencerOpen = true;
  panelCriticoOpen = false;
  panelAltaRotacionOpen = false;


  constructor(
    private toastr: ToastrService,
    private loteService: LoteService,
    private productoService: ProductoService
  ) {

  }

  ngOnInit(): void {
    const empleado = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idSucursalEmpleado = parseInt(empleado?.sucursal?.id_sucursal || '');


    this.loteService.obtenerLotesPorVencer(10, this.idSucursalEmpleado).subscribe({
      next: (response) => {
        this.lotesAVencer = response.data;
      },
      error: (err) => {
        console.error('Error al obtener los lotes', err);
      }
    });

    this.productoService.getProductosStockCritico(this.idSucursalEmpleado).subscribe({
      next: (response) => {
        this.productosStockCritico = response.data;
      },
      error: (err) => {
        console.error('Error al obtener los productos críticos', err);
      }
    });

    this.productoService.getProductosMasVendidos(this.idSucursalEmpleado).subscribe({
      next: (response) => {
        this.productosMasVendidos = response.data;
      },
      error: (err) => {
        console.error('Error al obtener los productos más vendidos', err);
      }
    });
  }



  toggleVencer() { this.panelVencerOpen = !this.panelVencerOpen; }
  toggleCritico() { this.panelCriticoOpen = !this.panelCriticoOpen; }
  toggleAltaRotacion() { this.panelAltaRotacionOpen = !this.panelAltaRotacionOpen; }

  exportarPdf() {
    this.toastr.success("PDF exportado correctamente")
  }
}
