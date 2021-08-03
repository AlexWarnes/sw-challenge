import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTilesComponent } from './data-tiles.component';

describe('DataTilesComponent', () => {
  let component: DataTilesComponent;
  let fixture: ComponentFixture<DataTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
