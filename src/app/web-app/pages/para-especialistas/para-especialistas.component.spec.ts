import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaEspecialistasComponent } from './para-especialistas.component';

describe('ParaEspecialistasComponent', () => {
  let component: ParaEspecialistasComponent;
  let fixture: ComponentFixture<ParaEspecialistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParaEspecialistasComponent]
    });
    fixture = TestBed.createComponent(ParaEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
