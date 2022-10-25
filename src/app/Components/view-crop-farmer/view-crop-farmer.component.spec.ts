import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCropFarmerComponent } from './view-crop-farmer.component';

describe('ViewCropFarmerComponent', () => {
  let component: ViewCropFarmerComponent;
  let fixture: ComponentFixture<ViewCropFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCropFarmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCropFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
