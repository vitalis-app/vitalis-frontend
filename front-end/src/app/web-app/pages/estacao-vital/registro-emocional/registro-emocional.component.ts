import { Component } from '@angular/core';

// Interfaces para tipagem dos dados
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
export class RegistroEmocionalComponent {
  
  // --- ESTADO DO COMPONENTE ---
  currentStep: number = 1;
  selectedEmotion: string = '';
  selectedTriggers: string[] = [];
  customTrigger: string = '';
  showCustomTriggerInput: boolean = false;
  journalEntry: string = '';
  showXpMessage: boolean = false;

  // --- DADOS ---
  emotions: Emotion[] = [
    { id: 'happy', name: 'Feliz', description: 'Tô de boa, tudo flui', cssClass: 'happy', icon: 'sun' },
    { id: 'calm', name: 'Tranquilo', description: 'Paz interior rolando', cssClass: 'calm', icon: 'cloud' },
    { id: 'sad', name: 'Triste', description: 'Coração tá mais pesado hoje', cssClass: 'sad', icon: 'cloud-rain' },
    { id: 'tired', name: 'Cansado', description: 'Energia lá embaixo', cssClass: 'tired', icon: 'moon' },
    { id: 'anxious', name: 'Ansioso', description: 'Peito meio apertado', cssClass: 'anxious', icon: 'zap' },
    { id: 'confused', name: 'Não sei', description: 'Tá meio confuso mesmo', cssClass: 'confused', icon: 'help-circle' }
  ];

  triggers: Trigger[] = [
    { id: 'love', name: 'Amor', icon: 'heart' },
    { id: 'relationships', name: 'Relacionamentos', icon: 'users' },
    { id: 'self-esteem', name: 'Autoestima', icon: 'sparkles' },
    { id: 'work-study', name: 'Trabalho/Estudos', icon: 'book-open' },
    { id: 'sleep', name: 'Qualidade do sono', icon: 'bed' },
    { id: 'food', name: 'Alimentação', icon: 'utensils' },
    { id: 'social-media', name: 'Redes sociais', icon: 'smartphone' },
    { id: 'time', name: 'Falta de tempo', icon: 'clock' },
    { id: 'unknown', name: 'Não sei / Sem motivo', icon: 'help-circle' },
    { id: 'other', name: 'Outro', icon: 'plus' }
  ];

  // --- GETTERS (PROPRIEDADES COMPUTADAS) ---
  get progress(): number {
    return (this.currentStep / 4) * 100;
  }

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selectedEmotion !== '';
      case 2:
        // Permite avançar mesmo sem selecionar gatilhos
        return true;
      case 3:
        return true; // Etapa opcional
      default:
        return true;
    }
  }

  // --- MÉTODOS (AÇÕES DO USUÁRIO) ---
  handleEmotionSelect(emotionId: string): void {
    this.selectedEmotion = emotionId;
    // Avança automaticamente após a seleção
    setTimeout(() => this.nextStep(), 300);
  }

  handleTriggerSelect(triggerId: string): void {
    if (triggerId === 'other') {
      this.showCustomTriggerInput = !this.showCustomTriggerInput;
      // Remove 'other' da seleção para não ser salvo como um gatilho
      const index = this.selectedTriggers.indexOf('other');
      if (index > -1) {
        this.selectedTriggers.splice(index, 1);
      }
      return;
    }

    const index = this.selectedTriggers.indexOf(triggerId);
    if (index > -1) {
      this.selectedTriggers.splice(index, 1); // Desseleciona
    } else {
      this.selectedTriggers.push(triggerId); // Seleciona
    }
  }

  onJournalChange(): void {
    if (this.journalEntry.length > 0 && !this.showXpMessage) {
      this.showXpMessage = true;
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    } else {
      // Lógica para finalizar e salvar os dados
      this.submitRegistration();
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
    // Aqui você enviaria os dados para uma API
    this.currentStep = 4; // Vai para a tela de finalização
  }

  goToVitalisStation(): void {
    // Redireciona para outra rota no app Angular
    // this.router.navigate(['/estacao-vital']);
    alert('Redirecionando para a Estação Vital...');
  }
}