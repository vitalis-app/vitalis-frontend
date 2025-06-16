import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './site/pages/home/home.component';
import { PlanosComponent } from './site/pages/planos/planos.component';
import { EspecialistasComponent } from './site/pages/especialistas/especialistas.component';
import { FuncionalidadesComponent } from './site/pages/funcionalidades/funcionalidades.component';
import { SobreComponent } from './site/pages/sobre/sobre.component';
import { HomeAppComponent } from './web-app/pages/home-app/home-app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'para-especialistas', component: EspecialistasComponent },
  { path: 'funcionalidades', component: FuncionalidadesComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'login', component: HomeAppComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
