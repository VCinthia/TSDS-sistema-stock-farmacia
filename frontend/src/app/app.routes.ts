import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { EstructuraPrincipalComponent } from './shared/components/estructura-principal/estructura-principal.component';
import { GestionInventarioComponent } from './shared/components/gestion-inventario/gestion-inventario.component';
import { AlertasComponent } from './shared/components/alertas/alertas.component';
import { VentasComponent } from './shared/components/ventas/ventas.component';
import { ReportesAnalisisComponent } from './shared/components/reportes-analisis/reportes-analisis.component';
import { FidelizacionClientesComponent } from './shared/components/fidelizacion-clientes/fidelizacion-clientes.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'inicio',
        component: EstructuraPrincipalComponent,
        children: [
            {path: 'gestionarInventario', component: GestionInventarioComponent},
            {path: 'alertas', component: AlertasComponent},
            {path: 'ventas', component: VentasComponent},
            {path: 'reportesAnalisis', component: ReportesAnalisisComponent},
            {path: 'fidelizacion', component: FidelizacionClientesComponent}
        ]
    },
];
