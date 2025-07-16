import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CadastroService } from 'src/app/shared/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: false
})
export class CadastroComponent implements OnInit {
  ativo: boolean = true;

  form: FormGroup;

  constructor(
    private cadastroService: CadastroService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), SenhaForteValidator]],
      telefone: ['', [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)
      ]],
      dataNascimento: ['', Validators.required],
      generoSelecionado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cadastroService.mostrarCadastro$.subscribe((estado) => {
      this.ativo = estado;
    });
  }

  abrir() {
    this.ativo = true;
  }

  fechar() {
    this.cadastroService.fecharCadastro();
  }

  registrar() {
    if (this.form.valid) {
      console.log('Dados de cadastro:', this.form.value);
      // Aqui pode mandar para API etc
    } else {
      // Marca todos os campos como "tocados" para mostrar erros
      this.form.markAllAsTouched();
    }
  }

  dropdownAberto: boolean = false;
  generoSelecionado: string = '';

  alternarDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }

  selecionarGenero(valor: string) {
    this.generoSelecionado = valor;
    this.form.get('generoSelecionado')?.setValue(valor);
    this.dropdownAberto = false;
  }

}

export function SenhaForteValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.value;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const senhaValida = temMaiuscula && temMinuscula && temNumero;
  return senhaValida ? null : { senhaFraca: true };
}

