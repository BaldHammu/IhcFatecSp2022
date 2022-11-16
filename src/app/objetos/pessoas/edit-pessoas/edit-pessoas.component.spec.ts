import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPessoasComponent } from './edit-pessoas.component';

describe('EditPessoasComponent', () => {
  let component: EditPessoasComponent;
  let fixture: ComponentFixture<EditPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPessoasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
