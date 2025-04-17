import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsPitcherComponent } from './vs-pitcher.component';

describe('VsPitcherComponent', () => {
  let component: VsPitcherComponent;
  let fixture: ComponentFixture<VsPitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VsPitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsPitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
