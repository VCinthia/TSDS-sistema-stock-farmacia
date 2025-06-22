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
import { TicketRecetaDTO } from '../../../../core/dtos/ticketReceta.dto';
import { ReporteAnmatService } from '../../../../services/reporteAnmat/reporteAnmat.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TicketRecetaService } from '../../../../services/ticketReceta/ticketReceta.service';

@Component({
  selector: 'app-cumplimiento-sanitario',
  imports: [MatCard, MatCardContent, MatFormFieldModule, BotonPrimarioComponent, MatTableModule, MatProgressSpinnerModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './cumplimiento-sanitario.component.html',
  styleUrl: './cumplimiento-sanitario.component.css'
})
export class CumplimientoSanitarioComponent implements OnInit {


  columnas: string[] = ['idCliente', 'dniCliente', 'nroReceta', 'fechaRecepecion', 'seleccionar'];
  seleccionados: string[] = [];
  recetasAReportar: TicketRecetaDTO[] = []

  constructor(
    private ticketRecetaService: TicketRecetaService, private toastr: ToastrService, private reporteService: ReporteAnmatService
  ) { }

  ngOnInit(): void {

    this.obtenerTodosNoReportados()
    
  }

  obtenerTodosNoReportados(){
    this.ticketRecetaService.obtenerTodosNoReportadosAnmat().subscribe({
      next: (response) => {
        this.recetasAReportar = response.data;

        this.recetasAReportar = response.data.map((r: any) => ({ ...r, seleccionado: false }));
      },
      error: (err) => {
        console.error('Error al obtener los clientes', err);
      }
    });
  }

  onCheckboxChange(numeroReceta: string, checked: boolean) {
    if (checked) {
      this.seleccionados.push(numeroReceta);
    } else {
      this.seleccionados = this.seleccionados.filter(n => n !== numeroReceta);
    }
  }

  exportarPDF() {
    if(this.recetasAReportar.length === 0){
      this.toastr.warning('No hay información para exportar')
    } else {
      this.toastr.success('PDF exportado éxitosamente')
    }
  }

  enviarReporteAnmat() {
    if (this.seleccionados.length === 0) {
      this.toastr.warning('Debe seleccionar al menos una receta para enviar el reporte.', 'Advertencia');
      return;
    }

    this.reporteService.reporteAnmat(this.seleccionados).subscribe({
      next: () => {
        this.toastr.success('Reporte enviado a ANMAT');
        this.seleccionados = [];
        this.obtenerTodosNoReportados();
      },
      error: (err) => {
        console.error('Error al enviar el reporte:', err);
        this.toastr.error('Error al enviar el reporte a ANMAT');
      }
    });
  }
}
