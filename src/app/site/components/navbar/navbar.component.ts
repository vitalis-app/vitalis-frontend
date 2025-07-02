import { Component, HostListener, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'web-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  public logoSrc: string = '';
  public currentTheme: 'light' | 'dark' = 'light'; // Apenas como cache local

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializa com o tema salvo ou preferido
      this.themeService.initializeTheme();

      // Assina mudanças de tema e atualiza UI
      this.themeService.theme$.subscribe(theme => {
        this.applyTheme(theme);
      });

      // Escuta mudança de preferência do SO
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const storedTheme = localStorage.getItem('theme');
        if (!storedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.themeService.setTheme(newTheme);
        }
      });
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    this.currentTheme = theme;
    this.updateLogo();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }

  private updateLogo(): void {
    this.logoSrc = this.currentTheme === 'dark'
      ? 'assets/imgs/vitalis-branca.png'
      : 'assets/imgs/vitalis.png';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const offset = window.scrollY;
      this.isScrolled = offset > 50;
    }
  }
}
