import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {Router, RouterOutlet, RouterLink} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface NavLateral {
  nombre: string;
  ruta: string;
}

@Component({
  selector: 'app-estructura-principal',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, RouterLink],
  templateUrl: './estructura-principal.component.html',
  styleUrl: './estructura-principal.component.css'
})
export class EstructuraPrincipalComponent {

   navLateralFarmaceutico: NavLateral[] = [
    { nombre: 'Inicio', ruta: 'inicio' },
    { nombre: 'Gestión de Inventario', ruta: 'gestionInventario' },
    { nombre: 'Alertas', ruta: 'alertas' },
    { nombre: 'Ventas', ruta: 'ventas' },
  ];

 navLateralAdministrativo: NavLateral[] = [
    { nombre: 'Inicio', ruta: 'inicio' },
    { nombre: 'Reportes y Análisis', ruta: 'reportesAnalisis' },
    { nombre: 'Fidelización de Clientes', ruta: 'fidelizacion' },
    { nombre: 'Cumplimiento Sanitario', ruta: 'cumplimientoSanitario' },
  ];

  currentRoute: string | undefined;
  sidenavConsultoriosExternos: NavLateral[] = [];
  sidenavEstudiosClinicos: NavLateral[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.configurarNavLateral();
  }

   configurarNavLateral(): void {
    //ADMIN
  
    //FARMACEUTICO  
  }

  cerrarSesion(): void {
    // const dialogRef = this.dialog.open(DialogCerrarSesionComponent, {
    //   width: '400px',
    //   height: '250px'
    // });
  }

}