import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreation } from './character-creation';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Petit composant neutre pour simuler la destination
@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('CharacterCreation', () => {
  let component: CharacterCreation;
  let fixture: ComponentFixture<CharacterCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreation],
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

    fixture = TestBed.createComponent(CharacterCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
