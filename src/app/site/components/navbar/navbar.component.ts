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
  public logoSrc: string = '';

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentTheme = 'light';
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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

