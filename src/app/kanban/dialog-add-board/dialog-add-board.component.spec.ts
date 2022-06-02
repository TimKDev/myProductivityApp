import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBoardComponent } from './dialog-add-board.component';

describe('DialogAddBoardComponent', () => {
  let component: DialogAddBoardComponent;
  let fixture: ComponentFixture<DialogAddBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
