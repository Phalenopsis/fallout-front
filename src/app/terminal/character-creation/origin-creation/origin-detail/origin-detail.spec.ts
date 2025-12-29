import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginDetail } from './origin-detail';

describe('OriginDetail', () => {
  let component: OriginDetail;
  let fixture: ComponentFixture<OriginDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
