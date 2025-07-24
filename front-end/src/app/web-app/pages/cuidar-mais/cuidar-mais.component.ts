import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Professional {
  id: number;
  name: string;
  crp: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
  imageUrl: string;
  badge: string;
  about: string;
  details: {
    abordagem: string;
    faixaEtaria: string;
    idiomas: string;
    modalidade: string;
  };
}

interface CalendarDay {
  date: Date;
  otherMonth: boolean;
}

@Component({
  selector: 'app-cuidar-mais',
  templateUrl: './cuidar-mais.component.html',
  styleUrls: ['./cuidar-mais.component.css'],
  providers: [DatePipe]
})
export class CuidarMaisComponent implements OnInit {

  // --- Dados ---

  categories: string[] = ['Ansiedade', 'Estresse', 'Autoestima', 'TCC', 'Psicanálise', 'Relacionamentos', 'Carreira', 'LGBTQIA+', 'Jovens', 'Família', 'Online', 'Presencial', 'Mulheres', 'Luto'];
  allProfessionals: Professional[] = [
    { id: 1, name: 'Profissional A', crp: '00/111111', rating: 4.9, reviews: 127, price: 80, tags: ['Ansiedade', 'TCC', 'Autoestima'], imageUrl: 'https://placehold.co/280x180/E0F2F1/333?text=Perfil', badge: 'Desconto Vitali+', about: 'Descrição sobre o profissional, sua abordagem, experiência e como pode ajudar o paciente a alcançar seus objetivos de bem-estar.', details: { abordagem: 'Terapia Cognitivo-Comportamental', faixaEtaria: 'Adultos, Jovens', idiomas: 'Português, Inglês', modalidade: 'Online, Presencial' } },
    { id: 2, name: 'Profissional B', crp: '00/222222', rating: 4.8, reviews: 89, price: 90, tags: ['Relacionamentos', 'Família', 'Carreira'], imageUrl: 'https://placehold.co/280x180/E0F2F1/333?text=Perfil', badge: '', about: 'Descrição sobre o profissional, sua abordagem, experiência e como pode ajudar o paciente a alcançar seus objetivos de bem-estar.', details: { abordagem: 'Sistêmica', faixaEtaria: 'Adultos', idiomas: 'Português', modalidade: 'Online' } },
    { id: 3, name: 'Profissional C', crp: '00/333333', rating: 5, reviews: 94, price: 70, tags: ['Luto', 'Estresse', 'Mulheres'], imageUrl: 'https://placehold.co/280x180/E0F2F1/333?text=Perfil', badge: 'Desconto Vitali+', about: 'Descrição sobre o profissional, sua abordagem, experiência e como pode ajudar o paciente a alcançar seus objetivos de bem-estar.', details: { abordagem: 'Humanista', faixaEtaria: 'Adultos, Mulheres', idiomas: 'Português', modalidade: 'Online, Presencial' } },
    { id: 4, name: 'Profissional D', crp: '00/444444', rating: 4.7, reviews: 156, price: 60, tags: ['LGBTQIA+', 'Jovens', 'Autoestima'], imageUrl: 'https://placehold.co/280x180/E0F2F1/333?text=Perfil', badge: '', about: 'Descrição sobre o profissional, sua abordagem, experiência e como pode ajudar o paciente a alcançar seus objetivos de bem-estar.', details: { abordagem: 'Psicanálise', faixaEtaria: 'Jovens, LGBTQIA+', idiomas: 'Português', modalidade: 'Online' } },
    { id: 5, name: 'Profissional E', crp: '00/555555', rating: 4.6, reviews: 78, price: 75, tags: ['TCC', 'Carreira', 'Jovens'], imageUrl: 'https://placehold.co/280x180/E0F2F1/333?text=Perfil', badge: '', about: 'Descrição sobre o profissional, sua abordagem, experiência e como pode ajudar o paciente a alcançar seus objetivos de bem-estar.', details: { abordagem: 'Terapia Cognitivo-Comportamental', faixaEtaria: 'Jovens', idiomas: 'Português', modalidade: 'Online' } },
  ];

  // --- Estado da UI ---
  searchTerm: string = '';
  activeFilters: Set<string> = new Set();
  filteredProfessionals: Professional[] = [];
  selectedProfessional: Professional | null = null;
  
  // --- Estado do Calendário ---
  currentDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  public monthNames: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  selectedDate: Date | null = null;
  availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  selectedTime: string | null = null;
  
  // --- Toast ---
  showConfirmationToast = false;
  confirmationMessage = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.filterProfessionals();
    this.generateCalendar();
  }

  // --- Lógica de Filtragem ---
  toggleFilter(category: string): void {
    if (this.activeFilters.has(category)) {
      this.activeFilters.delete(category);
    } else {
      this.activeFilters.add(category);
    }
    this.filterProfessionals();
  }

  isActiveFilter(category: string): boolean {
    return this.activeFilters.has(category);
  }

  clearFilters(): void {
    this.activeFilters.clear();
    this.searchTerm = '';
    this.filterProfessionals();
  }

  filterProfessionals(): void {
    let professionals = this.allProfessionals;
    const searchLower = this.searchTerm.toLowerCase();

    // Filtro por termo de pesquisa
    if (searchLower) {
      professionals = professionals.filter(prof => 
        prof.name.toLowerCase().includes(searchLower) || 
        prof.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filtro por categorias ativas
    if (this.activeFilters.size > 0) {
      professionals = professionals.filter(prof => 
        Array.from(this.activeFilters).every(filter => prof.tags.includes(filter))
      );
    }
    
    this.filteredProfessionals = professionals;
  }
  
  getActiveFiltersText(): string {
    return Array.from(this.activeFilters).join(', ');
  }

  // --- Lógica do Modal ---
  openProfileModal(prof: Professional): void {
    this.selectedProfessional = prof;
    this.resetScheduler();
  }

  closeProfileModal(): void {
    this.selectedProfessional = null;
  }

  // --- Lógica do Calendário ---
  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    for (let i = 0; i < 42; i++) {
      this.calendarDays.push({
        date: new Date(startDate),
        otherMonth: startDate.getMonth() !== month
      });
      startDate.setDate(startDate.getDate() + 1);
    }
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

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedTime = null; // Reseta a hora ao mudar a data
  }

  isSameDay(date1: Date, date2: Date | null): boolean {
    if (!date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  resetScheduler(): void {
    this.selectedDate = null;
    this.selectedTime = null;
    this.currentDate = new Date();
    this.generateCalendar();
  }
  
  confirmAppointment(): void {
    if (!this.selectedProfessional || !this.selectedDate || !this.selectedTime) return;
    
    const formattedDate = this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy');
    this.confirmationMessage = `Sua consulta com ${this.selectedProfessional.name} foi agendada para ${formattedDate} às ${this.selectedTime}.`;
    
    this.showConfirmationToast = true;
    this.closeProfileModal();
    
    setTimeout(() => {
      this.showConfirmationToast = false;
    }, 5000);
  }
}