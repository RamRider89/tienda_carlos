import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCrearNuevoComponent } from './dialogo-crear-nuevo.component';

describe('DialogoCrearNuevoComponent', () => {
  let component: DialogoCrearNuevoComponent;
  let fixture: ComponentFixture<DialogoCrearNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoCrearNuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCrearNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
