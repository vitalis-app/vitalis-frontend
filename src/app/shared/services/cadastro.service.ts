import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private mostrarCadastroSubject = new Subject<boolean>();
  mostrarCadastro$ = this.mostrarCadastroSubject.asObservable();

  abrirCadastro() {
    this.mostrarCadastroSubject.next(true);
  }

  fecharCadastro() {
    this.mostrarCadastroSubject.next(false);
  }
}