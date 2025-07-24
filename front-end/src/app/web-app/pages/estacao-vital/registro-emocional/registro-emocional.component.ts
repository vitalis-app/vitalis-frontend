import { Component } from '@angular/core'; // Removido OnChanges e SimpleChanges

// Interfaces (mantidas como estão)
export interface Emotion {
  id: string;
  name: string;
  description: string;
  cssClass: string;
  icon: string;
}

export interface Trigger {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-registro-emocional',
  templateUrl: './registro-emocional.component.html',
  styleUrls: ['./registro-emocional.component.css']
})
export class RegistroEmocionalComponent { // Removido "implements OnChanges"

  // --- ESTADO DO COMPONENTE ---
  currentStep: number = 1;
  selectedEmotion: string = '';
  selectedTriggers: string[] = [];
  customTrigger: string = '';
  showCustomTriggerInput: boolean = false;
  journalEntry: string = '';
  showXpMessage: boolean = false;
  animatedXp: number = 0;

  // --- DADOS (mantidos como estão) ---
  emotions: Emotion[] = [
    { id: 'happy', name: 'Feliz', description: 'Tô de boa, tudo flui', cssClass: 'happy', icon: 'sun' },
    { id: 'calm', name: 'Tranquilo', description: 'Paz interior rolando', cssClass: 'calm', icon: 'cloud' },
    { id: 'sad', name: 'Triste', description: 'Coração tá mais pesado hoje', cssClass: 'sad', icon: 'cloud-rain' },
    { id: 'tired', name: 'Cansado', description: 'Energia lá embaixo', cssClass: 'tired', icon: 'moon' },
    { id: 'anxious', name: 'Ansioso', description: 'Peito meio apertado', cssClass: 'anxious', icon: 'zap' },
    { id: 'confused', name: 'Não sei', description: 'Tá meio confuso mesmo', cssClass: 'confused', icon: 'help-circle' }
  ];

  triggers: Trigger[] = [
    { id: 'love', name: 'Amor', icon: 'ri-heart-line' },
    { id: 'relationships', name: 'Relacionamentos', icon: 'ri-group-line' },
    { id: 'self-esteem', name: 'Autoestima', icon: 'ri-sparkling-line' },
    { id: 'work-study', name: 'Trabalho/Estudos', icon: 'ri-book-open-line' },
    { id: 'sleep', name: 'Qualidade do sono', icon: 'ri-hotel-bed-line' },
    { id: 'food', name: 'Alimentação', icon: 'ri-restaurant-line' },
    { id: 'social-media', name: 'Redes sociais', icon: 'ri-smartphone-line' },
    { id: 'time', name: 'Tempo', icon: 'ri-time-line' },
    { id: 'unknown', name: 'Não sei / Sem motivo', icon: 'ri-question-mark' },
    { id: 'other', name: 'Outro', icon: 'ri-add-line' }
  ];

  // >>>>>> LÓGICA REMOVIDA <<<<<<
  // O método ngOnChanges foi completamente removido.

  // --- GETTERS (mantidos como estão) ---
  get progress(): number {
    return (this.currentStep / 4) * 100;
  }

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selectedEmotion !== '';
      case 2:
      case 3:
      default:
        return true;
    }
  }

  // --- MÉTODOS ---
  handleEmotionSelect(emotionId: string): void {
    this.selectedEmotion = emotionId;
  }

  handleTriggerSelect(triggerId: string): void {
    if (triggerId === 'other') {
      this.showCustomTriggerInput = !this.showCustomTriggerInput;
      const index = this.selectedTriggers.indexOf('other');
      if (index > -1) {
        this.selectedTriggers.splice(index, 1);
      }
      return;
    }
    const index = this.selectedTriggers.indexOf(triggerId);
    if (index > -1) {
      this.selectedTriggers.splice(index, 1);
    } else {
      this.selectedTriggers.push(triggerId);
    }
  }

  onJournalChange(): void {
    if (this.journalEntry.length > 0 && !this.showXpMessage) {
      this.showXpMessage = true;
    }
  }

  // >>>>>> LÓGICA CORRIGIDA <<<<<<
  nextStep(): void {
    if (this.currentStep === 3) {
      // Quando o usuário clica em "Finalizar"
      this.submitRegistration();
      this.currentStep++; // O passo vira 4

      // **A chamada da animação agora é feita aqui!**
      const totalXp = this.calculateTotalXp();
      setTimeout(() => {
        this.animateXp(totalXp, 1500); // Anima até o XP total em 1.5 segundos
      }, 300); // Atraso para dar tempo da tela aparecer

    } else if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  submitRegistration(): void {
    const registrationData = {
      emotion: this.selectedEmotion,
      triggers: this.selectedTriggers,
      customTrigger: this.customTrigger,
      journal: this.journalEntry,
      timestamp: new Date()
    };
    console.log('Dados salvos:', registrationData);
  }

  // --- MÉTODOS DE ANIMAÇÃO (mantidos como estão) ---
  calculateTotalXp(): number {
    let base_xp = 100;
    if (this.journalEntry.length > 0) {
      base_xp += 50;
    }
    return base_xp;
  }

  animateXp(finalValue: number, duration: number): void {
    const startValue = 0;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      this.animatedXp = Math.floor(easedProgress * (finalValue - startValue) + startValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this.animatedXp = finalValue;
      }
    };
    window.requestAnimationFrame(step);
  }
}
