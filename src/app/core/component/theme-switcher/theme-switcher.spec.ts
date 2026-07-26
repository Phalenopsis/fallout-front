import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitcherComponent } from './theme-switcher';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
