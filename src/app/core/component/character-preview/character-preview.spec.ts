import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPreview } from './character-preview';

describe('CharacterPreview', () => {
  let component: CharacterPreview;
  let fixture: ComponentFixture<CharacterPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
