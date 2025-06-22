import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {Router, RouterOutlet, RouterLink, NavigationEnd} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioDTO } from '../../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DialogoCerrarSesionComponent } from '../dialogo-cerrar-sesion/dialogo-cerrar-sesion.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

interface NavLateral {
  nombre: string;
  ruta: string;
}

@Component({
  selector: 'app-estructura-principal',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, RouterLink, CommonModule, MatDialogModule],
  templateUrl: './estructura-principal.component.html',
  styleUrl: './estructura-principal.component.css'
})
export class EstructuraPrincipalComponent implements OnInit {

  mostrarBienvenida = false;

  usuarioLogeado: UsuarioDTO | null = null;
  navLateral: NavLateral[] = [] 

   navLateralFarmaceutico: NavLateral[] = [
    { nombre: 'Inicio', ruta: '/inicio' },
    { nombre: 'Gestión de Inventario', ruta: 'gestionarInventario' },
    { nombre: 'Alertas', ruta: 'alertas' },
    { nombre: 'Ventas', ruta: 'ventas' },
    {nombre: 'Cerrar Sesión', ruta: ''}
  ];

 navLateralAdministrativo: NavLateral[] = [
    { nombre: 'Inicio', ruta: '/inicio' },
    { nombre: 'Reportes y Análisis', ruta: 'reportesAnalisis' },
    { nombre: 'Fidelización de Clientes', ruta: 'fidelizacion' },
    { nombre: 'Cumplimiento Sanitario', ruta: 'cumplimientoSanitario' },
    {nombre: 'Cerrar Sesión', ruta: ''}
  ];

  currentRoute: string | undefined;
  sidenavConsultoriosExternos: NavLateral[] = [];
  sidenavEstudiosClinicos: NavLateral[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.usuarioService.usuario$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
    this.configurarNavLateral();
    
    this.mostrarBienvenida = this.router.url === '/inicio';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarBienvenida = event.urlAfterRedirects === '/inicio';
    });
  }

   configurarNavLateral(): void {
    if (this.usuarioLogeado?.rol == 'ADMINISTRADOR'){
      this.navLateral = this.navLateralAdministrativo
    } else {
      this.navLateral = this.navLateralFarmaceutico
    }
  
  }

  cerrarSesion(): void {
    const ref = this.dialog.open(DialogoCerrarSesionComponent, {
      width: '400px',
      height: '200px'
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.usuarioService.logout();
        this.router.navigateByUrl('');
      }
    });
  }
}



  

  