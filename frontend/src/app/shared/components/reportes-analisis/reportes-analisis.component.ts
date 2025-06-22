import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { VentaDTO } from '../../../../core/dtos/venta.dto';
import { VentaService } from '../../../../services/ventas/venta.service';
import { BotonPrimarioComponent } from '../boton-primario/boton-primario.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { PDFService } from '../../../../services/pdf/pdf.service';


@Component({
  selector: 'app-repotes-analisis',
  imports: [MatCard, MatCardContent, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, FormsModule, MatTableModule, BotonPrimarioComponent, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './reportes-analisis.component.html',
  styleUrl: './reportes-analisis.component.css'
})

export class ReportesAnalisisComponent implements OnInit {

  ventas: VentaDTO[] = [];
  ventasFiltradas: VentaDTO[] = [];
  idSucursalEmpleado: string | undefined;
  cargando = false

  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

  columnas: string[] = ['idVenta', 'fecha', 'sucursal', 'precioTotal'];

  constructor(
    private ventaService: VentaService, private toastr: ToastrService, private pdfService : PDFService
  ) {

  }

  ngOnInit(): void {
    const empleado = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.idSucursalEmpleado = empleado?.sucursal?.id_sucursal || '';
    this.obtenerVentas();
  }

  obtenerVentas() {
  this.cargando = true;
  this.ventaService.obtenerTodasVentas().subscribe({
    next: (response) => {
      this.ventas = response.data;
      this.filtrarVentas(); 
      setTimeout(() => {
        this.cargando = false;
      }, 700);
    },
    error: (err) => {
      console.error('Error al obtener las ventas', err);
    }
  });
}


  filtrarVentas() {
    const desde = this.fechaDesde;
    const hasta = this.fechaHasta;

    function soloFecha(d: Date): string {
      return d.toISOString().split('T')[0];
    }

    this.ventasFiltradas = this.ventas.filter((venta) => {
      if (!venta.fecha) return false;

      const fechaVentaStr = soloFecha(new Date(venta.fecha));
      const desdeStr = desde ? soloFecha(desde) : null;
      const hastaStr = hasta ? soloFecha(hasta) : null;

      if (desdeStr && fechaVentaStr < desdeStr) return false;
      if (hastaStr && fechaVentaStr > hastaStr) return false;
      return true;
    });
  }

  exportarPDF(){

  const ids: string[] = this.ventasFiltradas.map(v => String(v.id_venta));
    console.log('Exportando IDs filtrados:', ids); // 👈 Agregá esto


  if (ids.length === 0) {
    this.toastr.warning('No hay ventas para exportar.');
    return;
  }

  this.pdfService.downloadVentasReport(ids).subscribe((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_ventas.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
  }

}
