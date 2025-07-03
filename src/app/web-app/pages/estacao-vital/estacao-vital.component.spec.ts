import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacaoVitalComponent } from './estacao-vital.component';

describe('EstacaoVitalComponent', () => {
  let component: EstacaoVitalComponent;
  let fixture: ComponentFixture<EstacaoVitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstacaoVitalComponent]
    });
    fixture = TestBed.createComponent(EstacaoVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
