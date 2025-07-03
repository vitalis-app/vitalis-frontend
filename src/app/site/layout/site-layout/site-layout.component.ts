
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importe o RouterModule para o router-outlet
import { NavbarComponent } from '../../components/navbar/navbar.component'; // Importe a sua Navbar
import { FooterComponent } from '../../components/footer/footer.component'; // Importe o seu Footer

@Component({
  selector: 'app-site-layout',
  standalone: true, // <-- Torna o componente independente
  imports: [
    RouterModule,    // <-- Disponibiliza o <router-outlet>
    NavbarComponent, // <-- Disponibiliza a <app-navbar>
    FooterComponent  // <-- Disponibiliza a <app-footer>
  ],
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent {

  constructor() { }

}