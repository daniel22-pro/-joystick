import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallejuegoComponent } from './detallejuego.component';

describe('DetallejuegoComponent', () => {
  let component: DetallejuegoComponent;
  let fixture: ComponentFixture<DetallejuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallejuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallejuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
