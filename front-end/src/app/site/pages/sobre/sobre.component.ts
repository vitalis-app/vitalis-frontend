import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {
  logoSrc = "";

  constructor(private themeService: ThemeService) {}

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Altura do seu navbar. Faça o ajuste fino aqui!
      const headerOffset = 90; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

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
