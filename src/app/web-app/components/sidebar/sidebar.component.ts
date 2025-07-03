import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  modoHover = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  public currentTheme: 'light' | 'dark';
  public logoSrc: string = '';

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentTheme = 'light';
  }

  handleMouseEnter(): void {
    if (this.modoHover) {
      this.isCollapsed = false;
      this.collapsedChange.emit(this.isCollapsed);
      this.updateLogo();
    }
  }

  handleMouseLeave(): void {
    if (this.modoHover) {
      this.isCollapsed = true;
      this.collapsedChange.emit(this.isCollapsed);
      this.updateLogo(); 
    }
  }
  
  toggleSidebar() {
    if (this.modoHover) {
      this.modoHover = false;
      this.isCollapsed = false;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
    this.updateLogo();
    this.collapsedChange.emit(this.isCollapsed);
  }

  toggleHoverMode() {
    this.modoHover = !this.modoHover;
    if (this.modoHover) {
      this.isCollapsed = true; 
    } else {
      this.isCollapsed = false;
    }
    this.updateLogo();
    this.collapsedChange.emit(this.isCollapsed);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
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
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (prefersDark) {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light';
    }

    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
    this.currentTheme = theme;
    this.updateLogo();
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

  private updateLogo(): void {
    if (this.isCollapsed) {
      this.logoSrc =
        this.currentTheme === 'dark'
          ? 'assets/imgs/vitalis-icon-branco.png'
          : 'assets/imgs/vitalis-icon.png';
    } else {
      this.logoSrc =
        this.currentTheme === 'dark'
          ? 'assets/imgs/vitalis-branca.png'
          : 'assets/imgs/vitalis.png';
    }
  }
}
