import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormConnectionComponent } from './dialog-form-connection.component';

describe('DialogFormConnectionComponent', () => {
  let component: DialogFormConnectionComponent;
  let fixture: ComponentFixture<DialogFormConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
