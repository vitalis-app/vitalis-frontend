import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  isSidebarOpen = false; // Controla o menu gaveta no mobile
  isCollapsed = false;   // Controla o recolhimento no desktop

  // Emite um evento para o componente pai quando a sidebar é recolhida/expandida
  @Output() collapseToggled = new EventEmitter<boolean>();

  constructor() { }

  // --- Métodos para o menu mobile ---
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // --- Método para o recolhimento no desktop ---
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseToggled.emit(this.isCollapsed);
  }
}
