import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'btn-scrollup',
  templateUrl: './btn-scrollup.component.html',
  styleUrls: ['./btn-scrollup.component.css']
})
export class BtnScrollupComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 500;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
