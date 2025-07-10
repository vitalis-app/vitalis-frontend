import { Component, OnInit } from '@angular/core';

// Interface para definir a estrutura de um cartão de aprendizado
export interface LearningCard {
  imageUrl: string;
  category: string;
  title: string;
  type: 'Artigo' | 'Vídeo' | 'Podcast' | 'Curso';
}

// Interface para definir a estrutura de um cartão de motivação
export interface MotivationCard {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-aprender',
  templateUrl: './aprender-mais.component.html',
  styleUrls: ['./aprender-mais.component.css']
})
export class AprenderComponent implements OnInit {

  // --- Propriedades para os Dados e Estado ---
  
  // Lista de categorias para os botões de filtro
  categories: string[] = ['Todos', 'Artigos', 'Vídeos', 'Podcasts', 'Cursos'];
  
  // Categoria ativa atualmente
  activeCategory: string = 'Todos';
  
  // Termo digitado na barra de pesquisa
  searchTerm: string = '';

  // Lista completa com todos os cartões de "Reflexão"
  allLearningCards: LearningCard[] = [
    { imageUrl: 'https://placehold.co/300x160/a4c3b2/ffffff?text=Reflexão', category: 'Artigo', title: 'O poder do agora', type: 'Artigo' },
    { imageUrl: 'https://placehold.co/300x160/6b9080/ffffff?text=Mindfulness', category: 'Vídeo', title: 'Mindfulness para iniciantes', type: 'Vídeo' },
    { imageUrl: 'https://placehold.co/300x160/eaf4f4/333333?text=Hábitos', category: 'Curso', title: 'Construindo hábitos positivos', type: 'Curso' },
    { imageUrl: 'https://placehold.co/300x160/ccd5ae/333333?text=Podcast', category: 'Podcast', title: 'Conversas sobre estoicismo', type: 'Podcast' }
  ];

  // Lista de cartões de "Motivacional"
  motivationCards: MotivationCard[] = [
    { icon: 'ri-lightbulb-flash-line', text: 'Seja grato' },
    { icon: 'ri-plant-line', text: 'Cuide de você' },
    { icon: 'ri-sun-line', text: 'Aproveite o dia' }
  ];

  // Lista que será exibida na tela, após os filtros
  filteredLearningCards: LearningCard[] = [];

  constructor() { }

  ngOnInit(): void {
    // Ao iniciar o componente, exibe todos os cartões
    this.filterCards();
  }

  /**
   * Define a categoria ativa e refiltra os cartões.
   * @param category A categoria selecionada pelo clique.
   */
  selectCategory(category: string): void {
    this.activeCategory = category;
    this.filterCards();
  }

  /**
   * Filtra os cartões com base na categoria ativa e no termo de pesquisa.
   */
  filterCards(): void {
    let tempCards = this.allLearningCards;

    // 1. Filtra por categoria
    if (this.activeCategory !== 'Todos') {
      tempCards = tempCards.filter(card => card.type === this.activeCategory);
    }

    // 2. Filtra pelo termo de pesquisa
    if (this.searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      tempCards = tempCards.filter(card => 
        card.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        card.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    this.filteredLearningCards = tempCards;
  }
}
