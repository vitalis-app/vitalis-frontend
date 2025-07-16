import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { CadastroService } from 'src/app/shared/services/cadastro.service';

@Component({
  selector: 'app-usuario-especialista',
  templateUrl: './usuario-especialista.component.html',
  styleUrls: ['./usuario-especialista.component.css']
})
export class UsuarioEspecialistaComponent {
  ativo: boolean = true;
  
  constructor(
    private usuarioEscolhaService: UsuarioService,
    private cadastroService: CadastroService
  ) {}
  
  ngOnInit() {
    this.usuarioEscolhaService.mostrarUsuario$.subscribe((estado) => {
      this.ativo = estado;
    });
  }

  abrir() {
    this.ativo = true;
  }

  fechar() {
    this.usuarioEscolhaService.fecharCadastro();
  }

  abrirCadastroModal(){
    this.cadastroService.abrirCadastro();
  }
}
