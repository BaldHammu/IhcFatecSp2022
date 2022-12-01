import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarBacklogComponent } from './dialog-criar-backlog.component';

describe('DialogCriarBacklogComponent', () => {
  let component: DialogCriarBacklogComponent;
  let fixture: ComponentFixture<DialogCriarBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCriarBacklogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCriarBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
