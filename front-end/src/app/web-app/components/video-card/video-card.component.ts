import { Component, Input, Output, EventEmitter } from '@angular/core';

interface LearningContent {
  type: 'Vídeo' | 'Podcast' | 'Palestra' | 'Música';
  title: string;
  titleOverlay?: string;
  imageUrl: string;
  tags: string[]; // Adicionado para permitir múltiplos filtros
  durationMinutes: number; // Duração em minutos (número)
  audience: string[]; // Público-alvo
  mainCategory: string; // Categoria principal (tema maior)
  popularityScore: number; // Para ordenação por popularidade
  publishDate: Date; // Para ordenação por mais recentes
  isFavorite: boolean; // Para ordenação por favoritos
  videoId?: string; // ID do vídeo do YouTube para o VideoPlayerComponent
  // videoDuration?: string; // Este campo pode ser removido se for sempre derivado de durationMinutes
  channelAuthor?: string; // Ex: "Canal Psicologia em Foco"
  views?: number; // Ex: 3200
  shortDescription?: string; // Resumo de até 100 caracteres
}

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() videoData!: LearningContent;
  @Output() videoCardClick = new EventEmitter<LearningContent>();
  @Output() tagClick = new EventEmitter<string>();

  constructor() { }

  onCardClick(): void {
    this.videoCardClick.emit(this.videoData);
  }

  onTagClick(tag: string, event: Event): void {
    event.stopPropagation(); // Impede que o clique na tag propague para o card inteiro
    this.tagClick.emit(tag);
  }

  formatViews(num: number | undefined): string {
    if (num === undefined) {
      return '0';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' mi';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' mil';
    }
    return num.toString();
  }

  /**
   * Converte uma duração em minutos para o formato hh:mm:ss.
   * @param totalMinutes A duração total em minutos.
   * @returns A duração formatada como string (hh:mm:ss).
   */
  formatDuration(totalMinutes: number | undefined): string {
    if (totalMinutes === undefined || totalMinutes < 0) {
      return '00:00';
    }

    const totalSeconds = Math.floor(totalMinutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number): string => num < 10 ? '0' + num : num.toString();

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }
}
