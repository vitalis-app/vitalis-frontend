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
import { BtnScrollupComponent } from './site/components/widgets/buttons/btn-scrollup/btn-scrollup.component';
import { LoginComponent } from './web-app/pages/login/login.component';
import { CadastroComponent } from './web-app/pages/cadastro/cadastro.component';
import { AprenderMaisComponent } from './web-app/pages/aprender-mais/aprender-mais.component';
import { CuidarMaisComponent } from './web-app/pages/cuidar-mais/cuidar-mais.component';
import { EstacaoVitalComponent } from './web-app/pages/estacao-vital/estacao-vital.component';
import { ConfiguracoesComponent } from './web-app/pages/configuracoes/configuracoes.component';
import { ContaComponent } from './web-app/pages/conta/conta.component';
import { BtnGradientComponent } from './site/components/widgets/buttons/btn-gradient/btn-gradient.component';
import { BtnSecondaryComponent } from './site/components/widgets/buttons/btn-secondary/btn-secondary.component';
import { BtnDestaqueComponent } from './site/components/widgets/buttons/btn-destaque/btn-destaque.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlanosComponent,
    EspecialistasComponent,
    NavbarComponent,
    FooterComponent,
    FuncionalidadesComponent,
    SobreComponent,
    SidebarComponent,
    HomeAppComponent,
    BtnScrollupComponent,
    LoginComponent,
    CadastroComponent,
    AprenderMaisComponent,
    CuidarMaisComponent,
    EstacaoVitalComponent,
    ConfiguracoesComponent,
    ContaComponent,
    BtnGradientComponent,
    BtnSecondaryComponent,
    BtnDestaqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
