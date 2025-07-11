import { Component, OnInit } from '@angular/core';

interface LearningContent {
  type: 'Artigo' | 'Vídeo' | 'Curso' | 'Podcast';
  title: string;
  titleOverlay: string;
  imageUrl: string;
  tags: string[]; // Adicionado para permitir múltiplos filtros
}

interface MotivationContent {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-aprender',
  templateUrl: './aprender-mais.component.html',
  styleUrls: ['./aprender-mais.component.css']
})
export class AprenderComponent implements OnInit {

  // --- Estado da UI  ---
  searchTerm: string = '';
  categories: string[] = ['Artigos', 'Vídeos', 'Podcasts', 'Cursos', 'Palestras', 'Ansiedade', 'Sono', 'Estudo'];
  activeFilters: Set<string> = new Set(); // Usa um Set para múltiplos filtros
  
  // --- Dados de Exemplo com Placeholders e Tags ---
  allLearningContent: LearningContent[] = [
    { type: 'Artigo', title: 'O poder do agora', titleOverlay: 'Reflexão', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Artigos', 'Ansiedade', 'Estudo'] },
    { type: 'Vídeo', title: 'Mindfulness para iniciantes', titleOverlay: 'Mindfulness', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Vídeos', 'Sono'] },
    { type: 'Curso', title: 'Construindo hábitos positivos', titleOverlay: 'Hábitos', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Cursos', 'Estudo'] },
    { type: 'Podcast', title: 'Conversas sobre estoicismo', titleOverlay: 'Estoicismo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopIJhxZ3dBmlYwkhWlb-IDMK_tBy6oAH6_g&s', tags: ['Podcast', 'Palestras'] }
  ];

  motivationContent: MotivationContent[] = [
    { icon: 'ri-lightbulb-flash-line', text: 'Pensamento Positivo' },
    { icon: 'ri-plant-line', text: 'Crescimento Pessoal' },
    { icon: 'ri-sun-line', text: 'Energia Diária' }
  ];

  filteredLearningContent: LearningContent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filterContent();
  }

  // --- Lógica de Filtragem  ---

  /**
   * Adiciona ou remove um filtro da lista de filtros ativos.
   * @param category A categoria a ser adicionada/removida.
   */
  toggleFilter(category: string): void {
    if (this.activeFilters.has(category)) {
      this.activeFilters.delete(category);
    } else {
      this.activeFilters.add(category);
    }
    this.filterContent();
  }

  /**
   * Verifica se um filtro está ativo.
   * @param category A categoria a ser verificada.
   * @returns Verdadeiro se o filtro estiver ativo.
   */
  isActiveFilter(category: string): boolean {
    return this.activeFilters.has(category);
  }

  /**
   * Limpa todos os filtros ativos e a pesquisa.
   */
  clearFilters(): void {
    this.activeFilters.clear();
    this.searchTerm = '';
    this.filterContent();
  }

  /**
   * Filtra o conteúdo com base nos filtros ativos e no termo de pesquisa.
   */
  filterContent(): void {
    let tempContent = this.allLearningContent;
    const searchLower = this.searchTerm.toLowerCase();

    // Filtra por termo de pesquisa
    if (searchLower) {
      tempContent = tempContent.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.titleOverlay.toLowerCase().includes(searchLower)
      );
    }

    // Filtra por categorias ativas (tags)
    if (this.activeFilters.size > 0) {
      tempContent = tempContent.filter(item => 
        Array.from(this.activeFilters).every(filter => item.tags.includes(filter))
      );
    }
    
    this.filteredLearningContent = tempContent;
  }

  /**
   * Retorna os filtros ativos como uma string para exibição.
   * @returns Uma string com os filtros ativos, separados por vírgula.
   */
  getActiveFiltersText(): string {
    return Array.from(this.activeFilters).join(', ');
  }
}
