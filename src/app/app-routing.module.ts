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
import { AprenderComponent } from './web-app/pages/aprender/aprender.component';
import { ComunidadeComponent } from './web-app/pages/comunidade/comunidade.component';
import { ConfiguracoesComponent } from './web-app/pages/configuracoes/configuracoes.component';
import { ContaComponent } from './web-app/pages/conta/conta.component';
import { EstacaoVitalComponent } from './web-app/pages/estacao-vital/estacao-vital.component';
import { MinhaJornadaComponent } from './web-app/pages/minha-jornada/minha-jornada.component';
import { PsicoapoioComponent } from './web-app/pages/psicoapoio/psicoapoio.component';
import { PlanosComponent as AppPlanosComponent } from './web-app/pages/planos/planos.component';
import { ParaEspecialistasComponent } from './web-app/pages/para-especialistas/para-especialistas.component';


const routes: Routes = [

  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'sobre', component: SobreComponent },
      { path: 'funcionalidades', component: FuncionalidadesComponent },
      { path: 'planos', component: SitePlanosComponent },
      { path: 'para-especialistas', component: SiteEspecialistasComponent }
    ]
  },

  {
    path: 'app',
    component: WebAppLayoutComponent, 
    children: [
      { path: '', component: HomeAppComponent },
      { path: 'aprender', component: AprenderComponent },
      { path: 'comunidade', component: ComunidadeComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'conta', component: ContaComponent },
      { path: 'estacao-vital', component: EstacaoVitalComponent },
      { path: 'minha-jornada', component: MinhaJornadaComponent },
      { path: 'psicoapoio', component: PsicoapoioComponent },
      { path: 'planos', component: AppPlanosComponent }, 
      { path: 'especialistas', component: ParaEspecialistasComponent } 
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
