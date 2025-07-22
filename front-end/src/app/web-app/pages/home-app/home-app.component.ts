import { Component, OnInit, AfterViewInit } from '@angular/core';

// Declare lucide as a global variable so TypeScript knows about it
declare const lucide: any;

@Component({
  selector: 'home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent implements OnInit, AfterViewInit {

  calendarEvents = [
    { type: 'consultation', title: 'Consulta com Psicóloga', time: 'Amanhã, 14:30', icon: 'user-check' },
    { type: 'activity', title: 'Atividade: Diário da Gratidão', time: 'Hoje', icon: 'book-heart' }
  ];

  recommendedContent = [
    { type: 'breathing', title: 'Técnicas de Respiração Consciente', duration: '5 min', tags: ['Ansiedade', 'Mindfulness'] },
    { type: 'meditation', title: 'Meditação para Iniciantes', duration: '8 min', tags: ['Meditação', 'Relaxamento'] }
  ];

  weeklyMood = [
    { day: 'Sunday', letter: 'D', mood: 'good', isToday: false },
    { day: 'Monday', letter: 'S', mood: 'good', isToday: false },
    { day: 'Tuesday', letter: 'T', mood: 'neutral', isToday: false },
    { day: 'Wednesday', letter: 'Q', mood: 'no_record', isToday: true }, // Assuming today is Wednesday
    { day: 'Thursday', letter: 'Q', mood: 'no_record', isToday: false },
    { day: 'Friday', letter: 'S', mood: 'no_record', isToday: false },
    { day: 'Saturday', letter: 'S', mood: 'no_record', isToday: false }
  ];

  registeredMoodCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.calculateRegisteredMood();
  }

  ngAfterViewInit(): void {
    // Initialize Lucide icons after the view has been rendered
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  calculateRegisteredMood(): void {
    this.registeredMoodCount = this.weeklyMood.filter(day => day.mood !== 'no_record').length;
  }

  getTooltipMessage(mood: string): string {
    switch (mood) {
      case 'good':
        return 'Você se sentiu bem';
      case 'neutral':
        return 'Você se sentiu mais ou menos';
      case 'bad':
        return 'Você se sentiu mal';
      case 'no_record':
      default:
        return 'Nenhum registro hoje';
    }
  }
}
