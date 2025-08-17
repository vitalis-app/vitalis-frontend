import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoCardComponent, LearningContent } from '../../components/video-card/video-card.component';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

// Suas interfaces
interface VideoTag { name: string; link?: string; }
interface MotivationContent { icon: string; text: string; }

@Component({
  selector: 'app-aprender',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule, VideoCardComponent, VideoPlayerComponent ],
  templateUrl: './aprender-mais.component.html',
  styleUrls: ['./aprender-mais.component.css']
})
export class AprenderComponent implements OnInit {

  // --- Estado da UI ---
  searchTerm: string = '';
  activeFilters: Set<string> = new Set();
  
  // UNIFICADO: Array único para exibir todas as tags de filtro.
  displayTags: string[] = [
    'Ansiedade', 'Bem-estar', 'Psicologia', 'Foco', 'Autoconhecimento', 
    'Estudos', 'Rotina', 'Autocuidado', 'Procrastinação', 'Vídeo', 'Vlogs', 
    'Podcast', 'Palestra', 'Música'
  ];

  sortBy: 'popular' | 'recent' | 'favorites' = 'popular';
  showSortDropdown: boolean = false;
  showMoreFiltersSidebar: boolean = false;
  showVideoPlayerModal: boolean = false;
  selectedVideo: LearningContent | null = null;
  durationOptions: { label: string, value: string }[] = [ { label: 'Até 5 minutos', value: '0-5' }, { label: '5-15 minutos', value: '5-15' }, { label: 'Mais de 15 minutos', value: '15+' } ];
  filterDuration: string = '';
  contentTypeOptions: string[] = ['Vídeo', 'Podcast', 'Palestra', 'Música'];
  filterContentType: Set<string> = new Set();
  audienceOptions: string[] = ['Jovens', 'Estudantes', 'Pais', 'Líderes', 'Adultos em geral'];
  filterAudience: Set<string> = new Set();
  mainCategoriesOptions: string[] = [ 'Saúde Mental', 'Autoconhecimento', 'Relacionamentos', 'Vida Profissional', 'Estilo de Vida', 'Estudo & Aprendizado' ];
  filterCategories: Set<string> = new Set();
  specificTagsOptions: string[] = [ 'Ansiedade', 'Tristeza', 'Raiva', 'Disciplina', 'Hábitos Saudáveis', 'Foco', 'Organização', 'Procrastinação', 'Família', 'Amigos', 'Convívio Social', 'Empatia', 'Sono', 'Hobbies', 'Alimentação', 'Movimento', 'Lazer', 'Psicologia', 'Resiliência', 'Terapia', 'Estresse', 'Meditação', 'Presença', 'Respiração', 'Atenção Plena', 'Valores', 'Identidade', 'Motivação', 'Sentido de Vida' ];
  filterSpecificTags: Set<string> = new Set();

  // --- Dados de Exemplo ---
  allLearningContent: LearningContent[] = [
    { type: 'Vídeo', title: 'Como manter o foco e atingir seus objetivos? | Leandro Karnal', imageUrl: 'https://i.ytimg.com/vi/dzRjOnJ0Ndw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAR5Dqn_678yEtu6z5p4gJATApkFQ', tags: ['Foco', 'Autoconhecimento', 'Mindfulness'], durationMinutes: 19.68, audience: ['Adultos em geral'], mainCategory: 'Autoconhecimento', popularityScore: 90, publishDate: new Date('2020-11-30'), isFavorite: false, videoId: 'dzRjOnJ0Ndw', channelAuthor: 'Prazer, Karnal - Canal Oficial de Leandro Karnal', views: 4055609, shortDescription: 'Manter o foco e a concentração tem sido uma tarefa difícil...' },
    { type: 'Música', title: '1 A.M Study Session 📚 [lofi hip hop]', imageUrl: 'https://i.ytimg.com/vi/lTRiuFIWV54/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAMK_m8HvYYIeUmaaXjbm2I1cPnVA', tags: ['Música', 'Foco', 'Meditação', 'Autocuidado'], durationMinutes: 61.22, audience: ['Jovens', 'Adultos em geral'], mainCategory: 'Estudo', popularityScore: 98, publishDate: new Date('2019-12-8'), isFavorite: true, videoId: 'lTRiuFIWV54', channelAuthor: 'Lofi Girl', views: 119621560, shortDescription: 'Músicas relaxantes para ajudar na concentração e nos estudos.' },
  ];
  motivationContent: MotivationContent[] = [ { icon: 'ri-lightbulb-flash-line', text: 'Pensamento Positivo' }, { icon: 'ri-plant-line', text: 'Crescimento Pessoal' }, { icon: 'ri-sun-line', text: 'Energia Diária' } ];
  filteredLearningContent: LearningContent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filterContent();
  }
  
  openVideoModal(videoItem: LearningContent): void {
    this.selectedVideo = videoItem;
    this.showVideoPlayerModal = true;
  }
  closeVideoModal(): void {
    this.showVideoPlayerModal = false;
    this.selectedVideo = null;
  }
  mapTagsToVideoTags(tags: string[] | undefined): VideoTag[] {
    if (!tags) { return []; }
    return tags.map(tag => ({ name: tag }));
  }
  toggleFilter(category: string): void {
    if (this.activeFilters.has(category)) { this.activeFilters.delete(category); }
    else { this.activeFilters.add(category); }
    this.filterContent();
  }
  isActiveFilter(category: string): boolean {
    return this.activeFilters.has(category);
  }
  clearFilters(): void {
    this.activeFilters.clear();
    this.searchTerm = '';
    this.clearAllSidebarFilters();
  }
  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }
  setSortBy(option: 'popular' | 'recent' | 'favorites'): void {
    this.sortBy = option;
    this.filterContent();
  }
  getSortOptionText(option: 'popular' | 'recent' | 'favorites'): string {
    switch (option) {
      case 'popular': return 'Mais Populares';
      case 'recent': return 'Mais Recentes';
      case 'favorites': return 'Favoritos';
      default: return 'Ordenar por';
    }
  }
  toggleMoreFiltersSidebar(): void {
    this.showMoreFiltersSidebar = !this.showMoreFiltersSidebar;
  }
  getSidebarStyles() {
    return { 'right': this.showMoreFiltersSidebar ? '0' : '-100%' };
  }
  toggleDurationFilter(durationValue: string): void {
    if (this.filterDuration === durationValue) { this.filterDuration = ''; } 
    else { this.filterDuration = durationValue; }
    this.filterContent();
  }
  toggleSetFilter(filterSet: Set<string>, item: string): void {
    if (filterSet.has(item)) { filterSet.delete(item); }
    else { filterSet.add(item); }
    this.filterContent();
  }
  clearAllSidebarFilters(): void {
    this.filterDuration = '';
    this.filterContentType.clear();
    this.filterAudience.clear();
    this.filterCategories.clear();
    this.filterSpecificTags.clear();
    this.filterContent();
  }
  filterContent(): void {
    let tempContent = [...this.allLearningContent];
    const searchLower = this.searchTerm.toLowerCase();
    
    if (searchLower) {
      tempContent = tempContent.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.shortDescription?.toLowerCase().includes(searchLower) ||
        item.channelAuthor?.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (this.activeFilters.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.activeFilters).every(filter => item.tags.includes(filter) || item.type === filter)
      );
    }
    
    if (this.filterDuration) {
      tempContent = tempContent.filter(item => {
        const duration = item.durationMinutes;
        switch (this.filterDuration) {
          case '0-5': return duration <= 5;
          case '5-15': return duration > 5 && duration <= 15;
          case '15+': return duration > 15;
          default: return true;
        }
      });
    }
    if (this.filterContentType.size > 0) {
      tempContent = tempContent.filter(item => this.filterContentType.has(item.type));
    }
    if (this.filterAudience.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.filterAudience).some(audienceFilter => item.audience.includes(audienceFilter))
      );
    }
    if (this.filterCategories.size > 0) {
      tempContent = tempContent.filter(item => this.filterCategories.has(item.mainCategory));
    }
    if (this.filterSpecificTags.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.filterSpecificTags).some(tagFilter => item.tags.includes(tagFilter))
      );
    }
    
    switch (this.sortBy) {
      case 'popular':
        tempContent.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'recent':
        tempContent.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
        break;
      case 'favorites':
        tempContent.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        break;
    }
    this.filteredLearningContent = tempContent;
  }
  getActiveFiltersText(): string {
    const filters: string[] = [];
    if (this.searchTerm) { filters.push(`"${this.searchTerm}"`); }
    if (this.activeFilters.size > 0) { filters.push(...Array.from(this.activeFilters)); }
    if (this.filterDuration) { filters.push(this.durationOptions.find(d => d.value === this.filterDuration)?.label || ''); }
    return filters.join('; ');
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