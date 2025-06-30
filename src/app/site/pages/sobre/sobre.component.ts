import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {
  logoSrc = "";

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.updateLogo(this.themeService.getTheme());
    this.themeService.theme$.subscribe(theme => {
      this.updateLogo(theme);
    });
  }

  private updateLogo(theme: 'light' | 'dark'): void {
    this.logoSrc = theme === 'dark'
      ? 'assets/imgs/vitalis-icon-contorno.png'
      : 'assets/imgs/vitalis-icon.png';
  }
}
