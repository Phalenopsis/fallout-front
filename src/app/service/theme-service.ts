import { Injectable, signal } from '@angular/core';

export type Theme = 'green' | 'orange';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  currentTheme = signal<Theme>('green');

  constructor() {
    // Charger le thème sauvegardé
    const saved = localStorage.getItem('terminal-theme') as Theme | null;
    if (saved) {
      this.setTheme(saved);
    } else {
      this.applyClass('green');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    this.applyClass(theme);
    localStorage.setItem('terminal-theme', theme);
  }

  private applyClass(theme: Theme) {
    const html = document.documentElement;
    html.classList.remove('green', 'orange');
    html.classList.add(theme);
  }
}
