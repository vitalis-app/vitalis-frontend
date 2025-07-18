import { Component, OnInit } from '@angular/core';

// Interface para definir a estrutura de um dia no calendário
interface CalendarDay {
  dayNumber: number;
  emotion: 'Tranquilo' | 'Motivado' | 'Ansioso' | 'Neutro' | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Date;
}

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public currentDate: Date = new Date();
  public monthNames: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  public daysOfWeek: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Dom, Seg, etc.
  public calendarDays: CalendarDay[] = [];

  // --- DADOS DE EXEMPLO ---
  // Em uma aplicação real, estes dados viriam de uma API ou serviço.
  private emotionData: Map<string, 'Tranquilo' | 'Motivado' | 'Ansioso' | 'Neutro'> = new Map([
    ['2025-07-01', 'Tranquilo'],
    ['2025-07-02', 'Motivado'],
    ['2025-07-03', 'Ansioso'],
    ['2025-07-05', 'Tranquilo'],
    ['2025-07-09', 'Tranquilo'],
    ['2025-07-10', 'Motivado'],
    ['2025-07-11', 'Ansioso'],
    ['2025-07-13', 'Tranquilo'],
    ['2025-07-14', 'Motivado'], // Hoje
  ]);

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo, 1 = Segunda, ...
    const totalDaysInMonth = lastDayOfMonth.getDate();

    // 1. Adiciona os dias do mês anterior para preencher o grid
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek; i > 0; i--) {
      const day = lastDayOfPrevMonth - i + 1;
      this.calendarDays.push({
        dayNumber: day,
        emotion: null,
        isCurrentMonth: false,
        isToday: false,
        date: new Date(year, month -1, day)
      });
    }

    // 2. Adiciona os dias do mês atual
    const today = new Date();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = this.formatDate(date); // Formata para 'YYYY-MM-DD'

      this.calendarDays.push({
        dayNumber: i,
        emotion: this.emotionData.get(dateString) || 'Neutro',
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        date: date
      });
    }
  }

  // Função auxiliar para formatar a data como chave do Map
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Funções para navegar entre os meses (bônus)
  public previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
