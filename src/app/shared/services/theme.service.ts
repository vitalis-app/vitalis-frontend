import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _theme = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this._theme.asObservable();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      let initialTheme: 'light' | 'dark' = 'light';
      if (savedTheme) {
        initialTheme = savedTheme;
      } else if (prefersDark) {
        initialTheme = 'dark';
      }
      this.setTheme(initialTheme);
    }
  }

  setTheme(theme: 'light' | 'dark'): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    this._theme.next(theme);
  }
}
