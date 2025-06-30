import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoapoioComponent } from './psicoapoio.component';

describe('PsicoapoioComponent', () => {
  let component: PsicoapoioComponent;
  let fixture: ComponentFixture<PsicoapoioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PsicoapoioComponent]
    });
    fixture = TestBed.createComponent(PsicoapoioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
