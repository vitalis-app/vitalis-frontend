import { Component } from '@angular/core';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent {

  // ✅ ADICIONE ESTA LINHA
  public abaAtiva: 'gratuito' | 'vital' | 'compartilhado' = 'vital';

  constructor() { }

  // ✅ ADICIONE ESTE MÉTODO
  selecionarAba(aba: 'gratuito' | 'vital' | 'compartilhado') {
    this.abaAtiva = aba;
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 90; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}