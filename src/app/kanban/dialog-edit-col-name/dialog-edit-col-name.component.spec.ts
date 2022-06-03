import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditColNameComponent } from './dialog-edit-col-name.component';

describe('DialogEditColNameComponent', () => {
  let component: DialogEditColNameComponent;
  let fixture: ComponentFixture<DialogEditColNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditColNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditColNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
