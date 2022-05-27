import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteColComponent } from './dialog-delete-col.component';

describe('DialogDeleteColComponent', () => {
  let component: DialogDeleteColComponent;
  let fixture: ComponentFixture<DialogDeleteColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
