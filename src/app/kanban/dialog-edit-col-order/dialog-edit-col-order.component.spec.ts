import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditColOrderComponent } from './dialog-edit-col-order.component';

describe('DialogEditColOrderComponent', () => {
  let component: DialogEditColOrderComponent;
  let fixture: ComponentFixture<DialogEditColOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditColOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditColOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
