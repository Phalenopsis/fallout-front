import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCharacter } from './save-character';

describe('SaveCharacter', () => {
  let component: SaveCharacter;
  let fixture: ComponentFixture<SaveCharacter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveCharacter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCharacter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
