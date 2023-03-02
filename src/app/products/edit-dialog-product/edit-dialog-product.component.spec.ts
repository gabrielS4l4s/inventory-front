import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogProductComponent } from './edit-dialog-product.component';

describe('EditDialogProductComponent', () => {
  let component: EditDialogProductComponent;
  let fixture: ComponentFixture<EditDialogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
