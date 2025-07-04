import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  modoHover = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  public currentTheme: 'light' | 'dark' = 'light';
  public logoSrc: string = '';
  private themeSubscription!: Subscription;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      this.updateLogo();
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  private updateLogo(): void {
    const isDark = this.currentTheme === 'dark';
    if (this.isCollapsed) {
      this.logoSrc = isDark
        ? 'assets/imgs/vitalis-icon-branco.png' // Tema escuro -> ícone branco
        : 'assets/imgs/vitalis-icon.png';       // Tema claro -> ícone escuro
    } else {
      this.logoSrc = isDark
        ? 'assets/imgs/vitalis-branca.png'      // Tema escuro -> logo branca
        : 'assets/imgs/vitalis.png';            // Tema claro -> logo escura
    }
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
}
