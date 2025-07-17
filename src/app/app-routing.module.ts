import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
// --- Layouts ---
import { SiteLayoutComponent } from './site/layout/site-layout/site-layout.component';
import { WebAppLayoutComponent } from './web-app/layout/web-app-layout/web-app-layout.component';
import { LoginPageLayoutComponent } from './web-app/layout/login-page-layout/login-page-layout.component';

// --- Páginas do Site ---
import { HomeComponent } from './site/pages/home/home.component';
import { SobreComponent } from './site/pages/sobre/sobre.component';
import { FuncionalidadesComponent } from './site/pages/funcionalidades/funcionalidades.component';
import { PlanosComponent as SitePlanosComponent } from './site/pages/planos/planos.component';
import { EspecialistasComponent as SiteEspecialistasComponent } from './site/pages/especialistas/especialistas.component';

// --- Páginas da Aplicação Web ---
import { HomeAppComponent } from './web-app/pages/home-app/home-app.component';
import { ConfiguracoesComponent } from './web-app/pages/configuracoes/configuracoes.component';
import { ContaComponent } from './web-app/pages/conta/conta.component';
import { EstacaoVitalComponent } from './web-app/pages/estacao-vital/estacao-vital.component';
import { MinhaJornadaComponent } from './web-app/pages/minha-jornada/minha-jornada.component';
import { CuidarMaisComponent } from './web-app/pages/CuidarMais/CuidarMais.component';
// Corrigido o caminho do import para corresponder ao seu componente
import { AprenderComponent } from './web-app/pages/aprender-mais/aprender-mais.component';

// --- Páginas de Autenticação ---
import { LoginComponent } from './web-app/pages/auth/login/login.component';
import { CadastroComponent } from './web-app/pages/auth/cadastro/cadastro.component';


const routes: Routes = [
  // 1. Rotas do Site Público (dentro do SiteLayoutComponent)
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'funcionalidades', component: FuncionalidadesComponent },
      { path: 'para-especialistas', component: SiteEspecialistasComponent },
      { path: 'planos', component: SitePlanosComponent },
      { path: 'sobre', component: SobreComponent },
    ]
  },

  // 2. Rotas da Aplicação Web (dentro do WebAppLayoutComponent)
  {
    path: 'app',
    component: WebAppLayoutComponent,
    children: [
      { path: '', component: HomeAppComponent },
      // Corrigido o nome da rota para 'aprender'
      { path: 'aprender-mais', component: AprenderComponent }, 
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'conta', component: ContaComponent },
      { path: 'estacao-vital', component: EstacaoVitalComponent },
      { path: 'minha-jornada', component: MinhaJornadaComponent },
      { path: 'CuidarMais', component: CuidarMaisComponent },
    ],
  },

  // 3. Rotas de Autenticação (dentro do LoginPageLayoutComponent)
  {
    path: 'auth', // Adicionado um caminho 'auth' para evitar conflito
    component: LoginPageLayoutComponent,
    children: [
      { path: 'auth/login', component: LoginComponent},
      ]
  },

  // 4. Rota de Fallback (se nenhuma outra rota corresponder)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule], // Importando FormsModule para uso em componentes que necessitam de formulários
  exports: [RouterModule, FormsModule] // Exportando RouterModule e FormsModule para uso em outros módulos
})
export class AppRoutingModule {}
