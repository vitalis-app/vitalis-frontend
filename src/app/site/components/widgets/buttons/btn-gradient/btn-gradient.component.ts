import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-gradient',
  templateUrl: './btn-gradient.component.html',
  styleUrls: ['./btn-gradient.component.css'],
})
export class BtnGradientComponent {
  @Input() text: string = 'Clique aqui';
}
