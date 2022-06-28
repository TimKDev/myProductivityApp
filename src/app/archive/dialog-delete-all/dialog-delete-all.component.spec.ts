import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAllComponent } from './dialog-delete-all.component';

describe('DialogDeleteAllComponent', () => {
  let component: DialogDeleteAllComponent;
  let fixture: ComponentFixture<DialogDeleteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
