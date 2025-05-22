import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { EstructuraPrincipalComponent } from './shared/components/estructura-principal/estructura-principal.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'inicio',
        component: EstructuraPrincipalComponent ,
    },
    // {
    //     path: 'estudiosClinicos', component: MainLayoutComponent,
    //     children: [
    //         {path: 'gestionarTurnos', component: MenuTurnosComponent},
    //         {path: 'nuevoTurno', component: SeleccionarEstudioComponent},
    //         {path: 'seleccionarTurno', component: SeleccionarTurnoComponent},
    //         {path: 'ingresarPaciente', component: IngresarDniPacienteComponent},
    //         {path: 'acreditarTurno', component: BuscarTurnoComponent,
    //         children: [
    //             {path: 'confirmarTurno', component: CardDatosTurnoComponent},
    //             {path: 'turnoNoEncontrado', component: CardDatosTurnoComponent}
    //         ]
    //         },
    //         {path: 'controlarInsumos', component: ControlarInsumosComponent },
    //         {path: 'gestionarPago', component: GestionarPagoComponent},
    //         {path: 'generarFactura', component:GenerarFacturaComponent},
    //         {path: 'listaEspera', component: ListaEsperaAdminComponent},
    //         {path: 'listaEsperaProf', component: ListaEsperaProfComponent,
    //             children: [
    //                 {path: 'llamarPaciente', component: LlamadoPaciente1Component},
    //                 {path: 'llamarPaciente2', component:LlamadoPaciente2Component}
    //             ]
    //         },
    //         {path: 'historiaClinica', component: HistoriaClinicaComponent}
    //     ]
    // },
    // {
    //     path: 'consultoriosExternos', component: MainLayoutComponent,
    //     children: [
    //         {path: 'gestionarTurnos', component: MenuTurnosComponent},
    //         {path: 'nuevoTurno', component: SeleccionarPracticaComponent},
    //         {path: 'seleccionarTurno', component: SeleccionarTurnoComponent},
    //         {path: 'ingresarPaciente', component: IngresarDniPacienteComponent,
    //             children: [
    //                 {path: 'confirmarPaciente', component: CardDatosPacienteComponent},
    //                 {path: 'pacienteNoEncontrado', component: CardNuevoPacienteComponent}
    //             ]
    //         },
    //         {path: 'confirmarTurno', component: ConfirmarTurnoComponent},
    //         {path: 'acreditarTurno', component: BuscarTurnoComponent,
    //         children: [
    //             {path: 'confirmarTurno', component: CardDatosTurnoComponent},
    //             {path: 'turnoNoEncontrado', component: CardDatosTurnoComponent}
    //         ]
    //         },
    //         {path: 'gestionarPago', component: GestionarPagoComponent},
    //         {path: 'generarFactura', component:GenerarFacturaComponent},
    //         {path: 'listaEspera', component: ListaEsperaAdminComponent},
    //         {path: 'listaEsperaProf', component: ListaEsperaProfComponent,
    //             children: [
    //                 {path: 'llamarPaciente', component: LlamadoPaciente1Component},
    //                 {path: 'llamarPaciente2', component:LlamadoPaciente2Component}
    //             ]
    //         },
    //         {path: 'historiaClinica', component: HistoriaClinicaComponent}

    //     ]
    // }
];
