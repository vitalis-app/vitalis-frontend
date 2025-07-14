import { Component } from '@angular/core';

@Component({
  selector: 'app-minha-jornada',
  templateUrl: './minha-jornada.component.html',
  styleUrls: ['./minha-jornada.component.css'],
})
export class MinhaJornadaComponent {
  activeTab: string = 'vital';

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  achievements = [
    {
      id: 1,
      titulo: 'Primeira Regada',
      descricao: 'Você regou sua planta emocional pela primeira vez.',
      status: 'completed',
      completedDate: '2025-07-11T09:00:00',
    },
    {
      id: 2,
      titulo: 'Constância é Tudo',
      descricao: 'Regue sua planta por 3 dias seguidos.',
      status: 'completed',
      completedDate: '2025-07-13T09:00:00',
    },
    {
      id: 3,
      titulo: 'Raízes Firmes',
      descricao: 'Regue sua planta por 7 dias consecutivos.',
      status: 'pending',
      progressoAtual: 4,
      progressoTotal: 7,
    },
    {
      id: 4,
      titulo: 'Jardineiro Dedicado',
      descricao:
        'Mantenha uma sequência de 14 dias cuidando da sua planta emocional.',
      status: 'pending',
      progressoAtual: 4,
      progressoTotal: 14,
    },
    {
      id: 5,
      titulo: 'Jornada em Flor',
      descricao: 'Complete um ciclo de 30 dias seguidos regando sua planta.',
      status: 'pending',
      progressoAtual: 4,
      progressoTotal: 30,
    },
    {
      id: 6,
      titulo: 'Aprendiz Vital',
      descricao: 'Assista seu primeiro conteúdo no Aprender+.',
      status: 'completed',
      completedDate: '2025-07-12T16:20:00',
    },
    {
      id: 7,
      titulo: 'Reflexivo(a)',
      descricao: 'Assista 5 vídeos da categoria Reflexões.',
      status: 'pending',
      progressoAtual: 2,
      progressoTotal: 5,
    },
    {
      id: 8,
      titulo: 'Explorador(a) do Conhecimento',
      descricao: 'Assista conteúdos de pelo menos 5 categorias diferentes.',
      status: 'pending',
      progressoAtual: 3,
      progressoTotal: 5,
    },
    {
      id: 9,
      titulo: 'Maratona Zen',
      descricao: 'Assista 3 vídeos em um único dia.',
      status: 'completed',
      completedDate: '2025-07-13T20:05:00',
    },
    {
      id: 10,
      titulo: 'Aprendiz Constante',
      descricao: 'Complete 10 conteúdos em uma semana.',
      status: 'pending',
      progressoAtual: 6,
      progressoTotal: 10,
    },
    {
      id: 11,
      titulo: 'Primeiro Sentir',
      descricao: 'Registre seu humor pela primeira vez.',
      status: 'completed',
      completedDate: '2025-07-10T10:45:00',
    },
    {
      id: 12,
      titulo: 'Autor da Sua Jornada',
      descricao: 'Escreva no Diário Vital 3 dias seguidos.',
      status: 'pending',
      progressoAtual: 1,
      progressoTotal: 3,
    },
    {
      id: 13,
      titulo: 'Emoções à Flor da Pele',
      descricao: 'Complete 10 registros de humor diferentes em uma semana.',
      status: 'pending',
      progressoAtual: 4,
      progressoTotal: 10,
    },
    {
      id: 14,
      titulo: 'Primeira Conquista',
      descricao: 'Você desbloqueou sua primeira conquista.',
      status: 'completed',
      completedDate: '2025-07-10T10:50:00',
    },
    {
      id: 15,
      titulo: 'Vitalis Star',
      descricao: 'Complete todas as missões diárias por 5 dias consecutivos.',
      status: 'pending',
      progressoAtual: 2,
      progressoTotal: 5,
    },
  ];

  // 👇 **MUDANÇA APLICADA AQUI**
  getRelativeDate(dateStr: string | undefined): string {
    if (!dateStr) return ''; // Esta linha já garante a segurança
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    return `${diffDays} dias atrás`;
  }

  showCompletedOnly = true;
  showSortDropdown = false;
  sortOrder: 'asc' | 'desc' = 'desc';

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.showSortDropdown = false;
  }

  get filteredAchievements() {
    const filtered = this.achievements.filter((a) =>
      this.showCompletedOnly ? a.status === 'completed' : a.status === 'pending'
    );

    // O sort deve ser aplicado ao array filtrado.
    return filtered.sort((a, b) => {
      // Ordenação para conquistas concluídas
      if (this.showCompletedOnly) {
        const dateA = new Date(a.completedDate!).getTime(); // '!' é seguro aqui por causa do filtro
        const dateB = new Date(b.completedDate!).getTime(); // '!' é seguro aqui por causa do filtro
        return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }

      return 0;
    });
  }
}
