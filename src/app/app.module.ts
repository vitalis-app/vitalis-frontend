import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './site/pages/home/home.component';
import { PlanosComponent } from './site/pages/planos/planos.component';
import { EspecialistasComponent } from './site/pages/especialistas/especialistas.component';
import { NavbarComponent } from './site/components/navbar/navbar.component';
import { FooterComponent } from './site/components/footer/footer.component';
import { FuncionalidadesComponent } from './site/pages/funcionalidades/funcionalidades.component';
import { SobreComponent } from './site/pages/sobre/sobre.component';
import { SidebarComponent } from './web-app/components/sidebar/sidebar.component';
import { HomeAppComponent } from './web-app/pages/home-app/home-app.component';
import { RouterModule } from '@angular/router';

import { AprenderComponent } from './web-app/pages/aprender/aprender.component';
import { ComunidadeComponent } from './web-app/pages/comunidade/comunidade.component';
import { ConfiguracoesComponent } from './web-app/pages/configuracoes/configuracoes.component';
import { ContaComponent } from './web-app/pages/conta/conta.component';
import { EstacaoVitalComponent } from './web-app/pages/estacao-vital/estacao-vital.component';
import { MinhaJornadaComponent } from './web-app/pages/minha-jornada/minha-jornada.component';
import { PsicoapoioComponent } from './web-app/pages/psicoapoio/psicoapoio.component';
import { WebAppLayoutComponent } from './web-app/layout/web-app-layout/web-app-layout.component';


@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    PlanosComponent,
    EspecialistasComponent,
    FuncionalidadesComponent,
    SobreComponent,
    SidebarComponent,
    HomeAppComponent,
    AprenderComponent,
    ComunidadeComponent,
    ConfiguracoesComponent,
    ContaComponent,
    EstacaoVitalComponent,
    MinhaJornadaComponent,
    PsicoapoioComponent,
    WebAppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot
    ([], 
      {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }