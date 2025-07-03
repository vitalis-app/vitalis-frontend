import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  // Controla a visibilidade dos formulários
  isEditingInfo = false;
  isChangingPassword = false;

  // Dados de exemplo para o utilizador
  user = {
    name: 'Maria Junior',
    email: 'maria.Junior@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15', // Formato yyyy-MM-dd para o input de data
    gender: 'Feminino'
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Ativa o modo de edição para as informações pessoais
  toggleEditInfo(): void {
    this.isEditingInfo = !this.isEditingInfo;
  }

  // Simula o ato de salvar e volta para o modo de visualização
  saveInfo(): void {
    console.log('Informações salvas:', this.user);
    this.isEditingInfo = false;
  }

  // Mostra/esconde o formulário de alteração de senha
  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }

  // Simula a alteração da senha e esconde o formulário
  changePassword(): void {
    console.log('Senha alterada com sucesso!');
    this.isChangingPassword = false;
  }
}
