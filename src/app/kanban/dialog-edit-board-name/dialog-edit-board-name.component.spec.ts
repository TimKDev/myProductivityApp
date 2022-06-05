import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBoardNameComponent } from './dialog-edit-board-name.component';

describe('DialogEditBoardNameComponent', () => {
  let component: DialogEditBoardNameComponent;
  let fixture: ComponentFixture<DialogEditBoardNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditBoardNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditBoardNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
