import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarSprintComponent } from './dialog-editar-sprint.component';

describe('DialogEditarSprintComponent', () => {
  let component: DialogEditarSprintComponent;
  let fixture: ComponentFixture<DialogEditarSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarSprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
