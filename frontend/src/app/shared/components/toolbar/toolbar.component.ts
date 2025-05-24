import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsuarioDTO } from '../../../../core/dtos/usuario.dto';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})

export class ToolbarComponent implements OnInit {
  usuarioLogeado: UsuarioDTO | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.usuario$.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
  }
}