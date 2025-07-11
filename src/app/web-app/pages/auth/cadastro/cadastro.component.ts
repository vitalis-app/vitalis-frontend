import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // IMPORTAR

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],  // DECLARAR AQUI
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  visivel = false;

  nome = '';
  email = '';
  senha = '';

  abrir() {
    this.visivel = true;
  }

  fechar() {
    this.visivel = false;
  }

  registrar() {
    // Enviar para API ou salvar local
    console.log('Dados de cadastro:', {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    });

    this.fechar();
  }
}
