import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPage } from './character-page';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Petit composant neutre pour simuler la destination
@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('CharacterPage', () => {
  let component: CharacterPage;
  let fixture: ComponentFixture<CharacterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterPage],
      providers: [
        provideHttpClient(), // <-- Ajouter ceci
        provideHttpClientTesting(),
        provideRouter([
          // On déclare la route qui posait problème
          { path: 'terminal/creation/name', component: DummyComponent },
          { path: '**', component: DummyComponent }, // Attrape-tout pour être tranquille
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
