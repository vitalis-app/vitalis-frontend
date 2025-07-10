import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
    titulos: string[] = [
      'Bem-vindo ao nosso site!',
      'Esperamos que você tenha um ótimo dia!',
      'Fique à vontade para explorar!',
      'Estamos felizes em te ver por aqui!',
      'Você é sempre bem-vindo!',
      'Entre e faça parte da nossa comunidade',
      'Aproveite sua visita!',
      'Seja muito bem-vindo!'
    ];

    subtitulos: string[] = [
      'Comece sua jornada agora mesmo.',
      'Seu próximo passo começa aqui.',
      'Estamos prontos para te ajudar.',
      'Conte conosco sempre que precisar.',
      'Tudo o que você precisa em um só lugar.',
      'A melhor experiência começa aqui.',
      'Sinta-se em casa.',
      'Descubra o que preparamos pra você.',
      'Aproveite cada detalhe do nosso site.'
    ];
    
    tituloAtual: string = '';
    subtituloAtual: string = '';

    ngOnInit(): void {
      this.tituloAtual = this.sortearMensagem(this.titulos);
      this.subtituloAtual = this.sortearMensagem(this.subtitulos);
    }

    sortearMensagem(texto: string[]): string {
      const indice = Math.floor(Math.random() * texto.length);
      return texto[indice];
    }
}
