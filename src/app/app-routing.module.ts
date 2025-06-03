import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { EspecialistasComponent } from './pages/especialistas/especialistas.component';
import { FuncionalidadesComponent } from './pages/funcionalidades/funcionalidades.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'para-especialistas', component: EspecialistasComponent },
  { path: 'funcionalidades', component: FuncionalidadesComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
