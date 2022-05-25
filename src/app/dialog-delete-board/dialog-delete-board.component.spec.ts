import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBoardComponent } from './dialog-delete-board.component';

describe('DialogDeleteBoardComponent', () => {
  let component: DialogDeleteBoardComponent;
  let fixture: ComponentFixture<DialogDeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
