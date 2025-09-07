import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProduct } from './display-product';

describe('DisplayProduct', () => {
  let component: DisplayProduct;
  let fixture: ComponentFixture<DisplayProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
