import { Component, OnInit } from '@angular/core';

interface LearningContent {
  type: 'Artigo' | 'Vídeo' | 'Curso' | 'Podcast';
  title: string;
  titleOverlay: string;
  imageUrl: string;
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

  // --- Estado da UI ---
  searchTerm: string = '';
  categories: string[] = ['Todos', 'Artigos', 'Vídeos', 'Podcasts', 'Cursos', 'Palestras', 'Ansiedade', 'Sono', 'Estudo'];
  activeCategory: string = 'Todos';

  // --- Dados de Exemplo com Placeholders ---
  allLearningContent: LearningContent[] = [
    { type: 'Artigo', title: 'Título do Artigo Genérico', titleOverlay: 'Roberto', imageUrl: 'https://soumaisfavela.com.br/wp-content/uploads/2023/07/RobertoCarlos.jpg' },
    { type: 'Vídeo', title: 'Título do Vídeo Genérico', titleOverlay: 'Romario', imageUrl: 'https://cdn-imgs.s3.sa-east-1.amazonaws.com/wp-content/uploads/2025/01/Romario.webp' },
    { type: 'Curso', title: 'Título do Curso Genérico', titleOverlay: 'Rodnei', imageUrl: 'https://www.marcoeusebio.com.br/files/rodnei-inter-ricardo-duarte.jpg' },
    { type: 'Podcast', title: 'Título do Podcast Genérico', titleOverlay: 'Ronaldo', imageUrl: 'https://editorial.uefa.com/resources/0282-184d73110076-1612dd46f21d-1000/cristiano_ronaldo_of_portugal_celebrates_after_scoring_a.jpeg' }
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

  /**
   * Define a categoria ativa e refiltra o conteúdo.
   * @param category A categoria selecionada.
   */
  selectCategory(category: string): void {
    this.activeCategory = category;
    this.filterContent();
  }

  /**
   * Filtra o conteúdo de aprendizado com base na categoria e no termo de pesquisa.
   */
  filterContent(): void {
    let tempContent = this.allLearningContent;
    const searchLower = this.searchTerm.toLowerCase();

    // Filtra por categoria
    if (this.activeCategory !== 'Todos') {
      tempContent = tempContent.filter(item => item.type === this.activeCategory);
    }

    // Filtra por termo de pesquisa
    if (searchLower) {
      tempContent = tempContent.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.titleOverlay.toLowerCase().includes(searchLower)
      );
    }

    this.filteredLearningContent = tempContent;
  }
}