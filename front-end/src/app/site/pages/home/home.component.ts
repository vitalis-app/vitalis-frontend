import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/shared/services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Altura do seu navbar. O valor de 90px deve estar correto.
      const headerOffset = 60; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

    constructor(
      private usuarioService: UsuarioService
    ) {}
    abrirUsuarioModal() {
    this.usuarioService.abrirCadastro();
  }
}
