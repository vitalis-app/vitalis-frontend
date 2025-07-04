import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteLayoutComponent } from './site/layout/site-layout/site-layout.component';
import { WebAppLayoutComponent } from './web-app/layout/web-app-layout/web-app-layout.component';

import { HomeComponent } from './site/pages/home/home.component';
import { SobreComponent } from './site/pages/sobre/sobre.component';
import { FuncionalidadesComponent } from './site/pages/funcionalidades/funcionalidades.component';
import { PlanosComponent as SitePlanosComponent } from './site/pages/planos/planos.component';
import { EspecialistasComponent as SiteEspecialistasComponent } from './site/pages/especialistas/especialistas.component';

import { HomeAppComponent } from './web-app/pages/home-app/home-app.component';
import { ConfiguracoesComponent } from './web-app/pages/configuracoes/configuracoes.component';
import { ContaComponent } from './web-app/pages/conta/conta.component';
import { EstacaoVitalComponent } from './web-app/pages/estacao-vital/estacao-vital.component';
import { MinhaJornadaComponent } from './web-app/pages/minha-jornada/minha-jornada.component';
import { PsicoapoioComponent } from './web-app/pages/psicoapoio/psicoapoio.component';
import { AprenderMaisComponent } from './web-app/pages/aprender-mais/aprender-mais.component';
import { LoginComponent } from './web-app/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'sobre', component: SobreComponent },
      { path: 'funcionalidades', component: FuncionalidadesComponent },
      { path: 'planos', component: SitePlanosComponent },
      { path: 'para-especialistas', component: SiteEspecialistasComponent },
    ],
  },

  {
    path: 'app',
    component: WebAppLayoutComponent,
    children: [
      { path: '', component: HomeAppComponent },
      { path: 'aprender-mais', component: AprenderMaisComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'conta', component: ContaComponent },
      { path: 'estacao-vital', component: EstacaoVitalComponent },
      { path: 'login', component: LoginComponent },
      { path: 'minha-jornada', component: MinhaJornadaComponent },
      { path: 'psicoapoio', component: PsicoapoioComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
