import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Image } from '../../../../core/component/image/image.component';
import { SKILL_DATA, SkillInfo, SkillKey } from '../../../../core/constants/skill-data.constant';
import { SPECIAL_DATA } from '../../../../core/constants/special-data.constant';
import { SpecialKey } from '../../../models/special.type';
import { CharacterStoreService } from '../../../services/character-store.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [Image, FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private characterStore = inject(CharacterStoreService);

  readonly skillList = SKILL_DATA;
  readonly specialList = SPECIAL_DATA;

  // Signal pour la compétence sélectionnée (null si rien n'est sélectionné)
  selectedSkillKey = signal<SkillKey | null>(null);

  // SPECIAL temporairement sélectionné dans la liste déroulante (override)
  selectedSpecialOverride = signal<SpecialKey | null>(null);

  get character() {
    return this.characterStore.character();
  }

  // Métadonnées de la compétence sélectionnée
  readonly activeSkillInfo = computed<SkillInfo | null>(() => {
    const key = this.selectedSkillKey();
    if (!key) return null;
    return this.skillList.find((s) => s.key === key) ?? null;
  });

  // Level de la compétence actuelle venant du character store
  readonly activeSkillLevel = computed(() => {
    const key = this.selectedSkillKey();
    if (!key || !this.character?.skills) return null;
    return this.character.skills[key] ?? null;
  });

  // Valeur du SPECIAL effectif (soit l'override temporaire, soit le SPECIAL par défaut de la compétence)
  readonly activeSpecialKey = computed<SpecialKey | null>(() => {
    const override = this.selectedSpecialOverride();
    if (override) return override;

    const skillInfo = this.activeSkillInfo();
    return skillInfo ? skillInfo.special : null;
  });

  // Calcul du Seuil de Réussite = SPECIAL effectif + Rang compétence
  readonly successThreshold = computed<number>(() => {
    const specKey = this.activeSpecialKey();
    const skillLevel = this.activeSkillLevel();
    if (!specKey || !this.character?.special) return 0;

    const specialVal = this.character.special[specKey] ?? 0;
    const rankVal = skillLevel?.rank ?? 0;
    return specialVal + rankVal;
  });

  // Calcul du Seuil Critique = Rang de la comp si Atout (taggedSkill), sinon 1
  readonly criticalThreshold = computed<number>(() => {
    const skillLevel = this.activeSkillLevel();
    if (!skillLevel) return 1;
    return skillLevel.taggedSkill ? skillLevel.rank : 1;
  });

  /**
   * Sélectionne une compétence.
   * Réappuyer sur la même compétence la désélectionne (vide la zone de droite).
   */
  selectSkill(key: SkillKey): void {
    if (this.selectedSkillKey() === key) {
      this.selectedSkillKey.set(null);
      this.selectedSpecialOverride.set(null);
    } else {
      this.selectedSkillKey.set(key);
      const skillInfo = this.skillList.find((s) => s.key === key);
      // Réinitialise la liste déroulante sur le SPECIAL par défaut de la compétence
      this.selectedSpecialOverride.set(skillInfo?.special ?? null);
    }
  }

  /**
   * Récupère le nom du SPECIAL de base pour l'affichage dans la colonne gauche (ex: "AGI", "FOR", etc.)
   */
  getSpecialLabel(specKey: SpecialKey): string {
    return (
      this.specialList
        .find((s) => s.key === specKey)
        ?.label.substring(0, 3)
        .toUpperCase() ?? ''
    );
  }

  /**
   * Récupère le rang du personnage pour une compétence donnée
   */
  getSkillRank(key: SkillKey): number {
    return this.character?.skills?.[key]?.rank ?? 0;
  }

  /**
   * Vérifie si la compétence est un Atout pour le personnage
   */
  isTaggedSkill(key: SkillKey): boolean {
    return this.character?.skills?.[key]?.taggedSkill ?? false;
  }

  /**
   * Sur changement dans le select (<select [(ngModel)]="selectedSpecialOverride">)
   */
  onSpecialChange(newSpecial: SpecialKey): void {
    this.selectedSpecialOverride.set(newSpecial);
  }
}
