import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekomendasiComponent } from './rekomendasi.component';

describe('RekomendasiComponent', () => {
  let component: RekomendasiComponent;
  let fixture: ComponentFixture<RekomendasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RekomendasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RekomendasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
