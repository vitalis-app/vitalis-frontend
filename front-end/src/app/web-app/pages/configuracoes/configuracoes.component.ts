import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit, OnDestroy {

  public currentTheme: 'light' | 'dark' = 'light';
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) {
    console.log('ConfiguracoesComponent: Construtor chamado.');
  }

  ngOnInit(): void {
    console.log('ConfiguracoesComponent: ngOnInit iniciado.');
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      console.log('ConfiguracoesComponent: Novo tema recebido do serviço:', theme);
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
      console.log('ConfiguracoesComponent: Subscrição do tema cancelada.');
    }
  }
  setTheme(theme: 'light' | 'dark'): void {
    console.log('ConfiguracoesComponent: Tentando definir o tema para:', theme);
    this.themeService.setTheme(theme);
  }
}
