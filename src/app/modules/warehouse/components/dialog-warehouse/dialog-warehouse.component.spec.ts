import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWarehouseComponent } from './dialog-warehouse.component';

describe('DialogWarehouseComponent', () => {
  let component: DialogWarehouseComponent;
  let fixture: ComponentFixture<DialogWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
