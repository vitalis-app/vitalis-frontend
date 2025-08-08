import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; 

@Component({
  selector: 'app-web-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent 
  ],
  templateUrl: './web-app-layout.component.html',
  styleUrls: ['./web-app-layout.component.css'] 
})
export class WebAppLayoutComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(isCollapsed: boolean): void {
    this.isSidebarCollapsed = isCollapsed;
  }
}