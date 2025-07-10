import { Component } from '@angular/core';

@Component({
  selector: 'app-minha-jornada',
  templateUrl: './minha-jornada.component.html',
  styleUrls: ['./minha-jornada.component.css']
})
export class MinhaJornadaComponent {
    // Estado para a aba ativa, inicializado como 'vital'
    activeTab: string = 'vital';

    // Método para mudar a aba ativa
    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
    }
}
