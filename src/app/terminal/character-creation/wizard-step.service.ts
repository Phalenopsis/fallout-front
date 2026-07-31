import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WizardStepService {
  // Indique si l'étape actuelle autorise le passage à la suivante
  canNext = signal<boolean>(true);

  // Masque le bouton "Sauver" si une étape ne le permet pas (optionnel)
  canSave = signal<boolean>(true);

  reset() {
    this.canNext.set(true);
    this.canSave.set(true);
  }
}
