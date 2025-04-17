import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitterHitComponent } from './hitter-hit.component';

describe('HitterHitComponent', () => {
  let component: HitterHitComponent;
  let fixture: ComponentFixture<HitterHitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitterHitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitterHitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
