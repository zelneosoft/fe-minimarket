import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoComponent } from './update-po.component';

describe('UpdatePoComponent', () => {
  let component: UpdatePoComponent;
  let fixture: ComponentFixture<UpdatePoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
