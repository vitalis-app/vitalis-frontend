import { Component, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';

// Interfaces para tipagem dos dados
interface Missao {
  id: number;
  descricao: string;
  xp: number;
  concluida: boolean;
  tipo: 'diaria' | 'semanal';
}

interface Conquista {
  id: number;
  descricao: string;
  concluida: boolean;
}

@Component({
  selector: 'app-estacao-vital',
  templateUrl: './estacao-vital.component.html',
  styleUrls: ['./estacao-vital.component.css'],
})
export class EstacaoVitalComponent implements OnInit {
  // Controle de mobile e visibilidade das missões
  isMobile = false;
  modalAberto = false;
  modalTipo: 'diarias' | 'semanal' = 'diarias';

  // Propriedades da planta e do jogador
  nomePlanta: string = 'Planta Fofinha';
  editandoNome: boolean = false;
  xp: number = 0; // XP total acumulado
  xpMax: number = 200; // XP necessário para o próximo nível
  nivel: number = 1; // Nível inicial
  xpAnimado: number = 0; // Valor de XP usado para a animação da barra

  @ViewChild('inputNomePlanta') inputNomePlanta!: ElementRef;

  // Dados mocados de missões e conquistas
  missoes: Missao[] = [
    { id: 1, descricao: 'Beba 2 litros de água', xp: 50, concluida: false, tipo: 'diaria' },
    { id: 2, descricao: 'Faça uma consulta', xp: 150, concluida: false, tipo: 'diaria' },
    { id: 3, descricao: 'Pule de paraquedas', xp: 100, concluida: false, tipo: 'diaria' },
    { id: 4, descricao: 'Realize 5 missões diárias', xp: 300, concluida: false, tipo: 'semanal' },
    { id: 5, descricao: 'Faça 2 consultas na semana', xp: 200, concluida: false, tipo: 'semanal' },
    { id: 6, descricao: 'Assista 5 vídeos do Aprender+', xp: 100, concluida: false, tipo: 'semanal' },
  ];

  conquistas: Conquista[] = [
    { id: 1, descricao: 'Primeiros passos: completou sua primeira missão!', concluida: true },
  ];

  ngOnInit() {
    this.checkMobile();
  }

  @HostListener('window:resize')
  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  abrirModal(tipo: 'diarias' | 'semanal') {
    this.modalTipo = tipo;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  // Getters para filtrar as missões por tipo
  get missoesDiarias(): Missao[] {
    return this.missoes.filter((m) => m.tipo === 'diaria');
  }

  get missoesSemanais(): Missao[] {
    return this.missoes.filter((m) => m.tipo === 'semanal');
  }

  get ultimaConquista(): Conquista {
    return this.conquistas.length > 0
      ? this.conquistas[this.conquistas.length - 1]
      : { id: 0, descricao: 'Nenhuma conquista ainda.', concluida: false };
  }

  completarMissao(missao: Missao): void {
    if (missao.concluida) return;
    missao.concluida = true;
    this.animarGanhoDeXp(missao.xp);
  }

  private animarGanhoDeXp(xpGanho: number): void {
    this.xp += xpGanho;
    let totalXpParaAnimar = xpGanho;

    const animacao = setInterval(() => {
      if (totalXpParaAnimar <= 0) {
        clearInterval(animacao);
        return;
      }

      this.xpAnimado++;
      totalXpParaAnimar--;

      if (this.xpAnimado >= this.xpMax) {
        this.nivel++;
        this.xpAnimado = 0;
        this.xpMax = Math.floor(this.xpMax * 1.5);
      }
    }, 12);
  }

  habilitarEdicaoNome(): void {
    this.editandoNome = true;
    setTimeout(() => this.inputNomePlanta?.nativeElement.focus(), 0);
  }

  desabilitarEdicaoNome(): void {
    this.editandoNome = false;
    console.log('Nome da planta salvo:', this.nomePlanta);
  }
}
