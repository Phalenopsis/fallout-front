import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-skill-creation',
  standalone: true,
  imports: [Image],
  templateUrl: './skill-creation.html',
  styleUrls: ['./../special-creation/special-creation.css', './skill-creation.css'],
})
export class SkillCreation implements OnInit {
  router: Router = inject(Router);
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);
  skillCreationService: SkillCreationService = inject(SkillCreationService);

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

  remainingPoints: number = 0;
  taggedSkillsPoints: number = 0;

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
    this.remainingPoints = ctx.remainingPoints;
    this.taggedSkillsPoints = ctx.taggedSkillsPoints;
  }

  setActive(skillKey: SkillKey) {
    this.activeSkillKey = skillKey;
  }

  get canNext() {
    return this.remainingPoints === 0 && this.taggedSkillsPoints === 0;
  }

  nextStep() {
    this.characterCreationService.character.skills = this.skillsCharacter;
    const route: string = `/terminal/creation/${this.characterCreationService.getNextStep()}`;
    this.characterCreationService.goToNextStep();
    this.router.navigate([route]);
  }

  saveAndNextStep() {
    this.characterCreationService.character.skills = this.skillsCharacter;
    this.characterCreationService.saveDraft().subscribe({
      next: () => {
        this.nextStep();
      },
      error: (err) => console.error(err),
    });
  }

  previousStep() {
    const route: string = `/terminal/creation/${this.characterCreationService.getPreviousStep()}`;
    this.characterCreationService.goToPreviousStep();
    this.router.navigate([route]);
  }
}
