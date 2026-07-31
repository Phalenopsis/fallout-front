import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../../../core/component/image/image.component';
import {
  SKILL_DATA,
  SKILL_DATA_MAP,
  SkillInfo,
  SkillKey,
} from '../../../core/constants/skill-data.constant';
import { Character } from '../../../character/models/character.class';
import { CharacterCreationService } from '../character-creation.service';
import { CharacterSkills } from './model/skill.desc';
import { SkillFSM } from './services/skill.final-state-machine';
import { SkillCreationService } from './skill-creation-service';
import { WizardStep } from '../wizard-step.interface';
import { WizardStepService } from '../wizard-step.service';

@Component({
  selector: 'app-skill-creation',
  standalone: true,
  imports: [Image],
  templateUrl: './skill-creation.html',
  styleUrls: ['./skill-creation.css'],
})
export class SkillCreation implements OnInit, WizardStep {
  router: Router = inject(Router);
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);
  skillCreationService: SkillCreationService = inject(SkillCreationService);
  wizardService: WizardStepService = inject(WizardStepService);

  readonly skillData = SKILL_DATA;
  readonly skillDataMap = SKILL_DATA_MAP;

  character: Character = this.characterCreationService.character;
  skillsCharacter: CharacterSkills = this.character.skills
    ? this.character.skills
    : this.skillCreationService.createEmptySkills(
        this.character.origin?.atoutOffert ? this.character.origin?.atoutOffert : null,
      );

  activeSkillKey: SkillKey | null = null;
  obligatorySkills: SkillKey[] = this.character.origin?.atoutAChoisirParmi ?? [];

  fsm!: SkillFSM;

  remainingPoints = signal<number>(0);
  taggedSkillsPoints = signal<number>(0);

  // 2. Transformer canNext en Computed (Signal réactif dérivé)
  canNext = computed(() => {
    return this.remainingPoints() === 0 && this.taggedSkillsPoints() === 0;
  });

  constructor() {
    // Met à jour la possibilité d'avancer selon la condition métier (canNext)
    effect(() => {
      const isReady = this.canNext();
      this.wizardService.canNext.set(isReady);
      this.wizardService.canSave.set(isReady);
    });
  }

  ngOnInit() {
    this.fsm = new SkillFSM({
      skillsCharacter: this.skillsCharacter,
      remainingPoints: 9 + (this.character.special?.intelligence ?? 0),
      taggedSkillsPoints:
        this.character.origin?.atoutGratuit || this.character.origin?.atoutAChoisirParmi ? 4 : 3,
      obligatorySkills: this.obligatorySkills,
      offeredTaggedSkill: this.character.origin?.atoutOffert || null,
    });

    this.updateFromFSM();
  }

  toggleTag(skill: SkillKey, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.fsm.toggleTag(skill, checked);
    this.updateFromFSM();
  }

  add(skill: SkillKey) {
    this.fsm.addPoint(skill);
    this.updateFromFSM();
  }

  remove(skill: SkillKey) {
    this.fsm.removePoint(skill);
    this.updateFromFSM();
  }

  get activeInfo(): SkillInfo | undefined {
    return this.activeSkillKey ? this.skillDataMap[this.activeSkillKey] : undefined;
  }

  private updateFromFSM() {
    const ctx = this.fsm.getContext();
    this.skillsCharacter = ctx.skillsCharacter;

    // Mettre à jour les Signals (ce qui va notifier canNext et donc l'effect !)
    this.remainingPoints.set(ctx.remainingPoints);
    this.taggedSkillsPoints.set(ctx.taggedSkillsPoints);
  }

  setActive(skillKey: SkillKey) {
    this.activeSkillKey = skillKey;
  }

  onSaveStep(): void {
    this.characterCreationService.character.skills = this.skillsCharacter;
  }

  onPreviousStep(): void {
    this.character.skills = this.skillCreationService.createEmptySkills(
      this.character.origin?.atoutOffert ? this.character.origin?.atoutOffert : null,
    );
  }
}
