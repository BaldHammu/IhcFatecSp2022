import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarBacklogArtefato } from './dialog-criar-artefato.component';

describe('DialogCriarBacklogComponent', () => {
  let component: DialogCriarBacklogArtefato;
  let fixture: ComponentFixture<DialogCriarBacklogArtefato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCriarBacklogArtefato ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCriarBacklogArtefato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
