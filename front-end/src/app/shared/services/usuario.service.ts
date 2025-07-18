import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private mostrarUsuarioEscolhaSubject = new Subject<boolean>();
  mostrarUsuario$ = this.mostrarUsuarioEscolhaSubject.asObservable();

  abrirCadastro() {
    this.mostrarUsuarioEscolhaSubject.next(true);
  }

  fecharCadastro() {
    this.mostrarUsuarioEscolhaSubject.next(false);
  }
}