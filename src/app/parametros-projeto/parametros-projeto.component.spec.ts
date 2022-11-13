import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosProjetoComponent } from './parametros-projeto.component';

describe('ParametrosProjetoComponent', () => {
  let component: ParametrosProjetoComponent;
  let fixture: ComponentFixture<ParametrosProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosProjetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
