import { Observable, of } from 'rxjs';

export interface WizardStep {
  /**
   * Exécuté avant de passer à l'étape suivante.
   * Permet à l'enfant d'enregistrer son état local dans le CharacterCreationService.
   */
  onSaveStep(): void;

  /**
   * Exécuté avant de revenir en arrière (optionnel).
   * Permet de nettoyer des données si nécessaire.
   */
  onPreviousStep?(): void;
}
