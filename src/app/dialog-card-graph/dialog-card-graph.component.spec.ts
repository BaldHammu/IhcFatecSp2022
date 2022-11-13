import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardGraphComponent } from './dialog-card-graph.component';

describe('DialogCardGraphComponent', () => {
  let component: DialogCardGraphComponent;
  let fixture: ComponentFixture<DialogCardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCardGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
