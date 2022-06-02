import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddColumnComponent } from './dialog-add-column.component';

describe('DialogAddColumnComponent', () => {
  let component: DialogAddColumnComponent;
  let fixture: ComponentFixture<DialogAddColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
