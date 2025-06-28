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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
