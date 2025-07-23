import { Component } from '@angular/core';

@Component({
  selector: 'app-estacao-vital',
  templateUrl: './estacao-vital.component.html',
  styleUrls: ['./estacao-vital.component.css']
})
export class EstacaoVitalComponent {
  texto: string = 'só 3 horinha mano só 3 horinha mano aa';
  limiteCaracteres: number = 37;

  get deveAnimar(): boolean {
    return this.texto.length > this.limiteCaracteres;
  }
}
