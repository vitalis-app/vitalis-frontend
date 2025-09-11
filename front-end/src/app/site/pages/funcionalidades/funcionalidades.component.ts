import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html',
  styleUrls: ['./funcionalidades.component.css']
})
export class FuncionalidadesComponent {
scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Usando o valor de 90px que funcionou bem antes.
      const headerOffset = 65; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
