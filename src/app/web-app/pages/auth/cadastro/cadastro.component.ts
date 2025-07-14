import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/shared/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: false
})

export class CadastroComponent implements OnInit {
  ativo: boolean = true; // Define se o modal está visível ou não

  constructor(private cadastroService: CadastroService) { }

  ngOnInit() {
    // Escuta as mudanças emitidas pelo CadastroService
    this.cadastroService.mostrarCadastro$.subscribe((estado) => {
      this.ativo = estado;  // Atualiza a visibilidade com base no estado
    });
  }

  abrir() {
    this.ativo = true;  // Torna o modal visível
  }

  fechar() {
    this.cadastroService.fecharCadastro();  // Fecha o modal
  }

  nome = '';
  email = '';
  senha = '';
  genero = '';
  telefone = '';
  dataNascimento = '';
  
  registrar() {
    // Enviar para API ou salvar local
    console.log('Dados de cadastro:', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone
    });
  }

  generoSelecionado: string = '';
  dropdownAberto: boolean = false;

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }

  fecharDropdown() {
    this.dropdownAberto = false;
  }
}