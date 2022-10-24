import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoNuevoDetalleComponent } from './dialogo-nuevo-detalle.component';

describe('DialogoNuevoDetalleComponent', () => {
  let component: DialogoNuevoDetalleComponent;
  let fixture: ComponentFixture<DialogoNuevoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoNuevoDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoNuevoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
