// aprender-mais.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importar DomSanitizer

interface VideoTag {
  name: string;
  link?: string; // Opcional, caso queira que a tag seja um link
}

interface LearningContent {
  type: 'Vídeo' | 'Podcast' | 'Palestra' | 'Música';
  title: string;
  titleOverlay?: string;
  imageUrl: string;
  tags: string[]; // Adicionado para permitir múltiplos filtros
  durationMinutes: number; // Duração em minutos
  audience: string[]; // Público-alvo
  mainCategory: string; // Categoria principal (tema maior)
  popularityScore: number; // Para ordenação por popularidade
  publishDate: Date; // Para ordenação por mais recentes
  isFavorite: boolean; // Para ordenação por favoritos
  // Novo campo para vídeos: ID do YouTube
  videoId?: string; // ID do vídeo do YouTube para o VideoPlayerComponent
  videoDuration?: string;
  channelAuthor?: string; // Ex: "Canal Psicologia em Foco"
  views?: number; // Ex: 3200
  shortDescription?: string; // Resumo de até 100 caracteres
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
  // Categorias principais (tipos de conteúdo)
  categories: string[] = ['Vídeo', 'Podcast', 'Palestra', 'Música']; // Ajustado para os tipos solicitados
  activeFilters: Set<string> = new Set(); // Usa um Set para múltiplos filtros (para chips de categoria e tags populares)

  // Tags mais populares (temáticas)
  popularTags: string[] = ['Foco']; // Ajustado para a tag solicitada
  sortBy: 'popular' | 'recent' | 'favorites' = 'popular'; // Padrão: Mais Populares
  showSortDropdown: boolean = false; // Estado do dropdown de ordenação

  showMoreFiltersSidebar: boolean = false; // Estado do sidebar de mais filtros

  // Variáveis para o modal do vídeo
  showVideoPlayerModal: boolean = false;
  selectedVideo: LearningContent | null = null;

  // Opções para filtros do sidebar
  durationOptions: { label: string, value: string }[] = [
    { label: 'Até 5 minutos', value: '0-5' },
    { label: '5-15 minutos', value: '5-15' },
    { label: 'Mais de 15 minutos', value: '15+' }
  ];
  filterDuration: string = ''; // Filtro de duração selecionado

  contentTypeOptions: string[] = ['Vídeo', 'Podcast', 'Palestra', 'Foco']; // Ajustado para os tipos solicitados
  filterContentType: Set<string> = new Set(); // Filtros de tipo de conteúdo

  audienceOptions: string[] = ['Jovens', 'Estudantes', 'Pais', 'Líderes', 'Adultos em geral']; // Mantido
  filterAudience: Set<string> = new Set(); // Filtros de público-alvo

  // Categorias temáticas revisadas (mantidas para estrutura, mas o conteúdo será filtrado)
  mainCategoriesOptions: string[] = [
    'Saúde Mental', 'Autoconhecimento', 'Relacionamentos',
    'Vida Profissional', 'Estilo de Vida', 'Estudo & Aprendizado'
  ];
  filterCategories: Set<string> = new Set(); // Filtros de categorias (temas maiores)

  // Tags específicas revisadas e consolidadas
  specificTagsOptions: string[] = [
    'Foco', 'Ansiedade' // Ajustado para a tag solicitada
  ];
  filterSpecificTags: Set<string> = new Set(); // Filtros de tags específicas

  // --- Dados de Exemplo com Placeholders e Tags --
  allLearningContent: LearningContent[] = [
    {
      type: 'Vídeo', title: 'Como manter o foco e atingir seus objetivos? | Leandro Karnal', imageUrl: 'https://i.ytimg.com/vi/dzRjOnJ0Ndw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAR5Dqn_678yEtu6z5p4gJATApkFQ',
      tags: ['Foco', 'Autoconhecimento', 'Mindfulness'], durationMinutes: 19.68, audience: ['Adultos em geral'], mainCategory: 'Autoconhecimento', popularityScore: 90, publishDate: new Date('2020-11-30'), isFavorite: false,
      videoId: 'dzRjOnJ0Ndw', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Prazer, Karnal - Canal Oficial de Leandro Karnal', views: 4055609, shortDescription: 'Manter o foco e a concentração tem sido uma tarefa difícil muito por causa das notificações no celular, principalmente vindas das redes sociais.'
    },
    {
      type: 'Música', title: '1 A.M Study Session 📚 [lofi hip hop]', titleOverlay: 'Música', imageUrl: 'https://i.ytimg.com/vi/lTRiuFIWV54/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAMK_m8HvYYIeUmaaXjbm2I1cPnVA',
      tags: ['Música', 'Foco', 'Meditação', 'Autocuidado'], durationMinutes: 61.22, audience: ['Jovens', 'Adultos em geral'], mainCategory: 'Estudo', popularityScore: 98, publishDate: new Date('2019-12-8'), isFavorite: true,
      videoId: 'lTRiuFIWV54', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Lofi Girl', views: 119621560, shortDescription: '🎼 | Listen on Spotify, Apple music and more →  https://fanlink.tv/lofigirl-music'
    },
    {
      type: 'Podcast', title: 'Conversas sobre estoicismo', titleOverlay: 'Estoicismo', imageUrl: 'https://placehold.co/400x250/CCE5FF/000000?text=Podcast+Estoicismo',
      tags: ['Podcast', 'Autoconhecimento', 'Filosofia'], durationMinutes: 25, audience: ['Adultos em geral'], mainCategory: 'Autoconhecimento', popularityScore: 88, publishDate: new Date('2023-02-10'), isFavorite: true,
      videoId: 'Z-jN-g0fL0w', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Mente Serena', views: 15234, shortDescription: 'Um guia prático para começar a meditar e encontrar a paz interior. Ideal para iniciantes.'
    },
    {
      type: 'Vídeo', title: 'Como a Produtividade Afeta sua Saúde Mental', titleOverlay: 'Produtividade', imageUrl: 'https://placehold.co/400x250/F0F8FF/000000?text=Produtividade+Video',
      tags: ['Vídeo', 'Produtividade', 'Saúde mental', 'Foco'], durationMinutes: 12, audience: ['Estudantes', 'Adultos em geral'], mainCategory: 'Vida Profissional', popularityScore: 95, publishDate: new Date('2023-04-25'), isFavorite: false,
      videoId: 'a1Y3Kx4xW_c', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Bem-Estar Diário', views: 289765, shortDescription: 'Descubra a relação entre sua produtividade e o bem-estar mental. Dicas práticas para um dia mais equilibrado.'
    },
    {
      type: 'Vídeo', title: 'Rotina Matinal para Reduzir a Ansiedade', titleOverlay: 'Rotina', imageUrl: 'https://placehold.co/400x250/E6E6FA/000000?text=Ansiedade+Video',
      tags: ['Vídeo', 'Ansiedade', 'Autocuidado', 'Rotina saudável'], durationMinutes: 5, audience: ['Adultos em geral'], mainCategory: 'Saúde Mental', popularityScore: 89, publishDate: new Date('2023-05-10'), isFavorite: true,
      videoId: 'hvsT6LzU54Q', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Calma na Alma', views: 9876, shortDescription: 'Comece o dia com práticas simples para acalmar a mente e reduzir os níveis de ansiedade.'
    },
    {
      type: 'Palestra', title: 'O Poder do Foco na Era Digital', titleOverlay: 'Foco Digital', imageUrl: 'https://placehold.co/400x250/C8E6C9/000000?text=Palestra+Foco',
      tags: ['Palestra', 'Foco', 'Produtividade', 'Estudo & Aprendizado'], durationMinutes: 40, audience: ['Adultos em geral', 'Estudantes', 'Líderes'], mainCategory: 'Vida Profissional', popularityScore: 90, publishDate: new Date('2023-07-20'), isFavorite: false,
      videoId: 'Z-jN-g0fL0w', // Exemplo de ID de vídeo do YouTube
      channelAuthor: 'Mente Serena', views: 15234, shortDescription: 'Um guia prático para começar a meditar e encontrar a paz interior. Ideal para iniciantes.'
    }
  ];

  motivationContent: MotivationContent[] = [
    { icon: 'ri-lightbulb-flash-line', text: 'Pensamento Positivo' },
    { icon: 'ri-plant-line', text: 'Crescimento Pessoal' },
    { icon: 'ri-sun-line', text: 'Energia Diária' }
  ];

  filteredLearningContent: LearningContent[] = [];

  constructor(private sanitizer: DomSanitizer) { } // Injetar DomSanitizer

  ngOnInit(): void {
    this.filterContent();
  }

  /**
   * Abre o modal do player de vídeo com o conteúdo do vídeo selecionado.
   * @param videoItem O item de LearningContent do vídeo a ser reproduzido.
   */
  openVideoModal(videoItem: LearningContent): void {
    this.selectedVideo = videoItem;
    this.showVideoPlayerModal = true;
  }

  /**
   * Fecha o modal do player de vídeo.
   */
  closeVideoModal(): void {
    this.showVideoPlayerModal = false;
    this.selectedVideo = null; // Limpa o vídeo selecionado ao fechar o modal
  }
  formatViews(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\,0$/, '') + ' mi';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\,0$/, '') + ' mil';
    }
    return num.toString();
  }

  /**
   * Mapeia um array de strings de tags para o formato esperado pelo VideoPlayerComponent ({ name: string }).
   * @param tags Array de strings de tags.
   * @returns Array de VideoTag.
   */
  mapTagsToVideoTags(tags: string[] | undefined): VideoTag[] {
    // Garante que tags não é undefined antes de usar map
    if (!tags) {
      return [];
    }
    return tags.map(tag => ({ name: tag }));
  }

  // --- Lógica de Filtragem e Ordenação ---

  /**
   * Adiciona ou remove um filtro da lista de filtros ativos (usado para chips de categoria e tags populares).
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
    this.filterDuration = '';
    this.filterContentType.clear();
    this.filterAudience.clear();
    this.filterCategories.clear();
    this.filterSpecificTags.clear();
    this.filterContent();
  }

  /**
   * Alterna a visibilidade do dropdown de ordenação.
   */
  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  /**
   * Define a opção de ordenação e aplica os filtros.
   * @param option A opção de ordenação ('popular' | 'recent' | 'favorites').
   */
  setSortBy(option: 'popular' | 'recent' | 'favorites'): void {
    this.sortBy = option;
    this.filterContent();
  }

  /**
   * Retorna o texto a ser exibido no botão de ordenação.
   * @param option A opção de ordenação.
   * @returns O texto correspondente.
   */
  getSortOptionText(option: 'popular' | 'recent' | 'favorites'): string {
    switch (option) {
      case 'popular': return 'Mais Populares';
      case 'recent': return 'Mais Recentes';
      case 'favorites': return 'Favoritos';
      default: return 'Ordenar por';
    }
  }

  /**
   * Alterna a visibilidade do sidebar "Mais Filtros".
   */
  toggleMoreFiltersSidebar(): void {
    this.showMoreFiltersSidebar = !this.showMoreFiltersSidebar;
  }

  /**
   * Adiciona ou remove um item de um Set de filtros (usado para filtros do sidebar).
   * @param filterSet O Set de filtros a ser modificado.
   * @param item O item a ser adicionado/removido.
   */
  toggleSetFilter(filterSet: Set<string>, item: string): void {
    if (filterSet.has(item)) {
      filterSet.delete(item);
    } else {
      filterSet.add(item);
    }
    this.filterContent();
  }

  /**
   * Limpa todos os filtros do sidebar.
   */
  clearAllSidebarFilters(): void {
    this.filterDuration = '';
    this.filterContentType.clear();
    this.filterAudience.clear();
    this.filterCategories.clear();
    this.filterSpecificTags.clear();
    this.filterContent();
  }

  /**
   * Filtra e ordena o conteúdo com base nos filtros ativos e no termo de pesquisa.
   */
  filterContent(): void {
    let tempContent = [...this.allLearningContent]; // Cria uma cópia para não modificar o array original
    const searchLower = this.searchTerm.toLowerCase();

    // 1. Filtra por termo de pesquisa
    if (searchLower) {
      tempContent = tempContent.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.shortDescription?.toLowerCase().includes(searchLower) || // Inclui descrição na pesquisa
        item.channelAuthor?.toLowerCase().includes(searchLower) || // Inclui autor na pesquisa
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // 2. Filtra por categorias ativas (chips principais e tags populares)
    if (this.activeFilters.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.activeFilters).every(filter => item.tags.includes(filter))
      );
    }

    // 3. Filtra por Duração (sidebar)
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

    // 4. Filtra por Tipo de Conteúdo (sidebar)
    if (this.filterContentType.size > 0) {
      tempContent = tempContent.filter(item => this.filterContentType.has(item.type));
    }

    // 5. Filtra por Público-alvo (sidebar)
    if (this.filterAudience.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.filterAudience).every(audienceFilter => item.audience.includes(audienceFilter))
      );
    }

    // 6. Filtra por Categorias (temas maiores - sidebar)
    if (this.filterCategories.size > 0) {
      tempContent = tempContent.filter(item => this.filterCategories.has(item.mainCategory));
    }

    // 7. Filtra por Tags Específicas (sidebar)
    if (this.filterSpecificTags.size > 0) {
      tempContent = tempContent.filter(item =>
        Array.from(this.filterSpecificTags).every(tagFilter => item.tags.includes(tagFilter))
      );
    }

    // 8. Ordenação
    switch (this.sortBy) {
      case 'popular':
        tempContent.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'recent':
        tempContent.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
        break;
      case 'favorites':
        tempContent.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)); // Favoritos primeiro
        break;
      default:
        // Sem ordenação específica, mantém a ordem original ou a ordem de filtragem
        break;
    }

    this.filteredLearningContent = tempContent;
  }

  /**
   * Retorna os filtros ativos como uma string para exibição.
   * @returns Uma string com os filtros ativos, separados por vírgula.
   */
  getActiveFiltersText(): string {
    const filters: string[] = [];
    if (this.searchTerm) {
      filters.push(`Pesquisa: "${this.searchTerm}"`);
    }
    if (this.activeFilters.size > 0) {
      filters.push(`Tags: ${Array.from(this.activeFilters).join(', ')}`);
    }
    if (this.filterDuration) {
      filters.push(`Duração: ${this.durationOptions.find(d => d.value === this.filterDuration)?.label}`);
    }
    if (this.filterContentType.size > 0) {
      filters.push(`Tipo: ${Array.from(this.filterContentType).join(', ')}`);
    }
    if (this.filterAudience.size > 0) {
      filters.push(`Público: ${Array.from(this.filterAudience).join(', ')}`);
    }
    if (this.filterCategories.size > 0) {
      filters.push(`Categorias: ${Array.from(this.filterCategories).join(', ')}`);
    }
    if (this.filterSpecificTags.size > 0) {
      filters.push(`Tags Específicas: ${Array.from(this.filterSpecificTags).join(', ')}`);
    }
    return filters.join('; ');
  }

  // Futura integração com o backend:
  // Para integrar com o backend, você precisaria de um serviço Angular
  // (por exemplo, LearningContentService) que faria requisições HTTP para sua API.
  // Você chamaria um método neste serviço (ex: `getLearningContent(filters)`)
  // dentro do seu método `filterContent` ou `ngOnInit`, e atualizaria `allLearningContent`
  // com os dados recebidos.

  // Exemplo hipotético:
  /*
  // import { LearningContentService } from '../services/learning-content.service'; // Supondo um serviço
  // constructor(private learningContentService: LearningContentService) {}

  // filterContent(): void {
  //   const filters = {
  //     searchTerm: this.searchTerm,
  //     activeFilters: Array.from(this.activeFilters),
  //     filterDuration: this.filterDuration,
  //     filterContentType: Array.from(this.filterContentType),
  //     filterAudience: Array.from(this.filterAudience),
  //     filterCategories: Array.from(this.filterCategories),
  //     filterSpecificTags: Array.from(this.filterSpecificTags),
  //     sortBy: this.sortBy
  //   };

  //   this.learningContentService.getLearningContent(filters).subscribe(
  //     (data: LearningContent[]) => {
  //       this.allLearningContent = data; // Atualiza com os dados do backend
  //       this.applyLocalFilteringAndSorting(); // Aplica filtros e ordenação adicionais se necessário, ou deixe o backend cuidar de tudo
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar conteúdo:', error);
  //       // Lógica para tratamento de erro, ex: exibir mensagem ao usuário
  //     }
  //   );
  // }
  */
}
