import { Component, HostListener, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  public currentTheme: 'light' | 'dark';

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Define um tema padrão inicial para evitar problemas no SSR ou antes do ngOnInit
    this.currentTheme = 'light';
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      // Ouve mudanças na preferência de tema do SO
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Atualiza o tema apenas se o usuário não tiver definido uma preferência manualmente via toggle
        const storedTheme = localStorage.getItem('theme');
        if (!storedTheme) {
          const newColorScheme = e.matches ? 'dark' : 'light';
          this.setTheme(newColorScheme);
        }
      });
    }
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (prefersDark) {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light'; // Padrão para light se nenhuma preferência/armazenamento
    }
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
    this.currentTheme = theme;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }

  // Getter opcional para atualizar o texto/ícone do botão com base no tema atual
  get themeButtonIcon(): string {
    if (this.currentTheme === 'dark') {
      return '☀️'; // Ícone para mudar para o tema claro
    } else {
      return '🌓'; // Ícone para mudar para o tema escuro
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const offset = window.scrollY;
      this.isScrolled = offset > 50;
    }
  }
}
