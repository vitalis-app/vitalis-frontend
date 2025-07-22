import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/shared/services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    constructor(
      private usuarioService: UsuarioService
    ) {}
    abrirUsuarioModal() {
    this.usuarioService.abrirCadastro();
  }
}
