import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-minha-jornada',
  templateUrl: './minha-jornada.component.html',
  styleUrls: ['./minha-jornada.component.css']
})
export class MinhaJornadaComponent {

  // Lógica para o Gráfico de linhas
  public chartData: ChartData<'line'> = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    datasets: [
      {
        label: 'XP diário',
        data: [],
        fill: false,
        tension: 0.3,
        borderColor: '',
        backgroundColor: '',
        pointBackgroundColor: '',
        pointRadius: 5
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {};
  public chartType: 'line' = 'line';

  // Pág Ativa
  activeTab: string = 'vital';
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  geralStats = {
    id: 1,
    diasAtivos: 100,
    totalXp: 1200,
    missoesConcluidas: 25,
    reflexoesEscritas: 12
  };

  // Variáveis dos XP's diários
  xpPorDia = [
    { dia: 'Domingo', valor: 180 },
    { dia: 'Segunda', valor: 100 },
    { dia: 'Terça', valor: 820 },
    { dia: 'Quarta', valor: 180 },
    { dia: 'Quinta', valor: 220 },
    { dia: 'Sexta', valor: 280 },
    { dia: 'Sábado', valor: 150 }
  ];

  // Dia com mais xp
  mostProductiveDay: { dia: string; valor: number } = { dia: '', valor: 0 };

  ngOnInit(): void {
    // Obtemos as cores da paleta atual do CSS
    const corTexto = this.getCSSVariableValue('--verde-1') || '#176b5d';
    const corLinha = this.getCSSVariableValue('--verde-4') || '#7dd1c3';
    const corPonto = this.getCSSVariableValue('--verde-10') || '#27b29b';
    const corVerde2 = this.getCSSVariableValue('--verde-0') || '#176b5d';


    // Preenche os dados dinamicamente
    this.chartData.labels = this.xpPorDia.map(item => item.dia);
    this.chartData.datasets[0].data = this.xpPorDia.map(item => item.valor);
    this.chartData.datasets[0].borderColor = corLinha;
    this.chartData.datasets[0].backgroundColor = corPonto;
    this.chartData.datasets[0].pointBackgroundColor = corPonto;

    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: corTexto,
            font: {
              family: 'Poppins, sans-serif'
            }
          },
          grid: {
            color: corTexto + '30'
          }
        },
        x: {
          ticks: {
            color: corTexto,
            font: {
              family: 'Poppins, sans-serif'
            }
          },
          grid: {
            color: corTexto + '30'
          }
        }
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: corTexto
          }
        },
        tooltip: {
          bodyFont: {
            family: 'Poppins, sans-serif'
          },
          titleFont: {
            family: 'Poppins, sans-serif'
          },
          bodyColor: corTexto, // Cor do texto dos valores
          titleColor: corTexto, // Cor do texto do título (dia da semana)
          backgroundColor: this.getCSSVariableValue('--verde-6') || '#d8f3dc', // Cor de fundo do tooltip
          borderColor: this.getCSSVariableValue('--verde-5') || '#aed9b9', // Cor da borda do tooltip
          borderWidth: 1,
          callbacks: {
            labelColor: (context) => ({
              borderColor: this.getCSSVariableValue('--verde-3') || '#27b29b',
              backgroundColor: this.getCSSVariableValue('--verde-3') || '#27b29b',
              borderWidth: 1,
              borderRadius: 2,
            }),
            title: (context) => {
              // Formata o título para exibir o dia da semana
              const labelIndex = context?.[0]?.dataIndex;
              return this.chartData.labels?.[labelIndex] as string;
            },
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + ' XP';
              }
              return label;
            }
          }
        }
      }
    }

    // Lógica para encontrar o dia mais produtivo
    this.mostProductiveDay = this.xpPorDia.reduce((prev, current) =>
      (prev.valor > current.valor) ? prev : current
    );
  }

  getCSSVariableValue(variable: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }

  get maxXP(): number {
    return Math.max(...this.xpPorDia.map((d) => d.valor));
  }

  // Conquistas
  achievements = [
    {
      id: 1,
      titulo: 'Primeiro passo',
      descricao: 'Primeiro registro na Estação Vital.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 2,
      titulo: 'Constante',
      descricao: 'Registro em 7 dias consecutivos.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 7,
      dataConquista: ''
    },
    {
      id: 3,
      titulo: 'Eu me comprometi',
      descricao: '21 registros em até 30 dias.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 21,
      dataConquista: ''
    },
    {
      id: 4,
      titulo: 'Ritual de cuidado',
      descricao: 'Criou o próprio ritmo de uso na plataforma.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },

    // 2. Autocuidado e ação prática
    {
      id: 5,
      titulo: 'Hidratado',
      descricao: 'Concluiu a missão “Beber água” 5 vezes.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 5,
      dataConquista: ''
    },
    {
      id: 6,
      titulo: 'Concluindo',
      descricao: 'Concluiu 10 missões.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 10,
      dataConquista: ''
    },
    {
      id: 7,
      titulo: 'Estou zen',
      descricao: 'Usou meditação do Aprender+ 2 vezes.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 2,
      dataConquista: ''
    },
    {
      id: 8,
      titulo: 'Me cuidando',
      descricao: 'Concluiu missão de autocuidado 5 vezes.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 5,
      dataConquista: ''
    },
    {
      id: 9,
      titulo: 'Me ouvindo',
      descricao: 'Escreveu um textinho pela 1ª vez.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 10,
      titulo: 'Escritor nato',
      descricao: 'Escreveu 5 reflexões.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 5,
      dataConquista: ''
    },

    // 4. Cuidando mais
    {
      id: 11,
      titulo: 'Tomei coragem',
      descricao: 'Solicitou o primeiro agendamento com especialista.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 12,
      titulo: 'Meu espaço',
      descricao: 'Realizou a primeira sessão.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 13,
      titulo: 'Direção certa',
      descricao: 'Compareceu a 3 sessões.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 3,
      dataConquista: ''
    },
    {
      id: 14,
      titulo: 'Construção emocional',
      descricao: 'Completou 8 sessões.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 8,
      dataConquista: ''
    },

    // 5. Aprendizado e crescimento
    {
      id: 15,
      titulo: 'Primeiro insight',
      descricao: 'Assistiu ao primeiro vídeo no Aprender+.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 16,
      titulo: 'Em expansão',
      descricao: 'Assistiu a 5 vídeos diferentes.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 5,
      dataConquista: ''
    },
    {
      id: 17,
      titulo: 'Me identifiquei',
      descricao: 'Favoritou um vídeo que fez sentido.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 18,
      titulo: 'Explorador(a)',
      descricao: 'Viu conteúdos de 3 categorias diferentes.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 3,
      dataConquista: ''
    },

    // 6. Símbolos de evolução
    {
      id: 19,
      titulo: 'Floresta interior',
      descricao: 'Desbloqueou 10 conquistas.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 10,
      dataConquista: ''
    },
    {
      id: 20,
      titulo: 'O começo de novo',
      descricao: 'Voltou a usar após um tempo sem acessar.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    },
    {
      id: 21,
      titulo: 'Me vi de verdade',
      descricao: 'Fez reflexões consistentes por 7 dias.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 7,
      dataConquista: ''
    },
    {
      id: 22,
      titulo: 'Floresci',
      descricao: 'Fez registros, missões e vídeos na mesma semana.',
      status: 'pendente',
      progressoAtual: 0,
      progressoTotal: 1,
      dataConquista: ''
    }
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

  showCompletedOnly = false;
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
      this.showCompletedOnly ? a.status === 'completa' : a.status === 'pendente'
    );

    // O sort deve ser aplicado ao array filtrado.
    return filtered.sort((a, b) => {
      // Ordenação para conquistas concluídas
      if (this.showCompletedOnly) {
        const dateA = new Date(a.dataConquista!).getTime(); // '!' é seguro aqui por causa do filtro
        const dateB = new Date(b.dataConquista!).getTime(); // '!' é seguro aqui por causa do filtro
        return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }

      return 0;
    });
  }
}