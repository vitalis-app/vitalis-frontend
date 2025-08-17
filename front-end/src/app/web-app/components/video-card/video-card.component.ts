import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definição da interface, agora completa com todas as propriedades.
export interface LearningContent {
  // Propriedades originais
  type: 'Vídeo' | 'Podcast' | 'Palestra' | 'Música';
  title: string;
  imageUrl: string;
  tags: string[];
  durationMinutes: number;
  channelAuthor?: string; // Opcional
  views?: number; // Opcional
  shortDescription?: string; // Opcional

  // --- Propriedades adicionadas para filtros, ordenação e player ---
  videoId: string;
  audience: string[];
  mainCategory: string;
  popularityScore: number;
  publishDate: Date;
  isFavorite: boolean;
}

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() videoData!: LearningContent;
  @Output() videoCardClick = new EventEmitter<LearningContent>();
  @Output() tagClick = new EventEmitter<string>(); // Emite uma STRING

  constructor() { }

  onCardClick(): void {
    this.videoCardClick.emit(this.videoData);
  }

  onTagClick(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    this.tagClick.emit(tag); // Emite a STRING da tag
  }

  // Funções de formatação usadas no template
  formatViews(num: number | undefined): string {
    if (num === undefined) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' mi';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' mil';
    return num.toString();
  }

  formatDuration(totalMinutes: number | undefined): string {
    if (totalMinutes === undefined || totalMinutes < 0) return '00:00';
    const totalSeconds = Math.floor(totalMinutes * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const pad = (num: number): string => num < 10 ? '0' + num : num.toString();
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}