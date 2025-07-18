import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  titulos: string[] = [
    'Bem-vindo de volta.',
    'Ótimo tê-lo conosco novamente.',
    'Sua presença é sempre bem-vinda.',
    'Que bom revê-lo por aqui.',
    'Continuamos à sua disposição.',
    'De volta ao seu painel.',
    'Agradecemos sua confiança contínua.',
    'É um prazer recebê-lo novamente.',
    'Retorne ao que é importante.',
    'Sua jornada continua conosco.'
  ];
  
  subtitulos: string[] = [
    'Continue exatamente de onde parou.',
    'Estamos prontos para atendê-lo.',
    'Conte com a mesma qualidade de sempre.',
    'Seus dados e preferências foram mantidos.',
    'Progresso, inovação e suporte a um clique de distância.',
    'A plataforma está pronta para você.',
    'Soluções personalizadas, como sempre.',
    'Sua experiência contínua é a nossa prioridade.',
    'Acompanhe as novidades e continue evoluindo.',
    'Estamos aqui para impulsionar seus próximos passos.'
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

export interface Pessoa {
  id?: number;
  nome: string;
  email: string;
}
