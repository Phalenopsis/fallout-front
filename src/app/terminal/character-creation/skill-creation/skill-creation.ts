import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { SkillCreationService } from './skill-creation-service';
import { Character } from '../../../character/models/character.class';
import { Router } from '@angular/router';
import { CharacterSkills, SKILL_DEFINITIONS, SkillKey, SKILLS } from './model/skill.desc';
import { SkillFSM } from './services/skill.final-state-machine';
import { SrcImage } from '../../../core/models/src-image.model';
import { SKILL_IMAGES } from '../../../core/component/image/skill.images';
import { Image } from '../../../core/component/image/image.component';

@Component({
  selector: 'app-skill-creation',
  imports: [Image],
  templateUrl: './skill-creation.html',
  styleUrls: ['./../special-creation/special-creation.css', './skill-creation.css'],
})
export class SkillCreation {
  router: Router = inject(Router);
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);
  skillCreationService: SkillCreationService = inject(SkillCreationService);
  character: Character = this.characterCreationService.character;
  skillsCharacter: CharacterSkills = this.character.skills
    ? this.character.skills
    : this.skillCreationService.createEmptySkills(
        this.character.origin?.atoutOffert ? this.character.origin?.atoutOffert : null,
      );

  skills = SKILLS;
  activeSkill: SkillKey | null = null;
  obligatorySkills = this.character.origin?.atoutAChoisirParmi
    ? this.character.origin?.atoutAChoisirParmi
    : [];
  offeredTaggedSkill: SkillKey | null = null;

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

  get activeImage(): SrcImage | null {
    return this.activeSkill ? SKILL_IMAGES[this.activeSkill] : null;
  }

  get activeDescription(): string[] {
    if (!this.activeSkill) return [];
    return SKILL_DEFINITIONS[this.activeSkill].description;
  }

  private updateFromFSM() {
    const ctx = this.fsm.getContext();
    this.skillsCharacter = ctx.skillsCharacter;
    this.remainingPoints = ctx.remainingPoints;
    this.taggedSkillsPoints = ctx.taggedSkillsPoints;
  }

  setActive(skillKey: SkillKey) {
    this.activeSkill = skillKey;
  }

  getSkillLabel(skillKey: SkillKey): string {
    return SKILL_DEFINITIONS[skillKey].nom;
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
