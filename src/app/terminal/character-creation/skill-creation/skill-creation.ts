import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { SkillCreationService } from './skill-creation-service';
import { Character } from '../../../character/models/character.class';
import { Router } from '@angular/router';
import { CharacterSkills, SkillName, SKILLS } from './model/skill.desc';
import { SkillFSM } from './services/skill.final-state-machine';

@Component({
  selector: 'app-skill-creation',
  imports: [],
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
    : this.skillCreationService.createEmptySkills();

  skills = SKILLS;
  activeSkill: SkillName | null = null;
  obligatorySkills = this.character.origin?.atoutAChoisirParmi
    ? this.character.origin?.atoutAChoisirParmi
    : [];

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
    });

    this.updateFromFSM();
  }

  toggleTag(skill: SkillName, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.fsm.toggleTag(skill, checked);
    this.updateFromFSM();
  }

  add(skill: SkillName) {
    this.fsm.addPoint(skill);
    this.updateFromFSM();
  }

  remove(skill: SkillName) {
    this.fsm.removePoint(skill);
    this.updateFromFSM();
  }

  private updateFromFSM() {
    const ctx = this.fsm.getContext();
    this.skillsCharacter = ctx.skillsCharacter;
    this.remainingPoints = ctx.remainingPoints;
    this.taggedSkillsPoints = ctx.taggedSkillsPoints;
  }

  setActive(skillName: SkillName) {
    this.activeSkill = skillName;
  }

  getSkillLabel(skillName: SkillName): string {
    return this.skills.find((s) => s.name === skillName)?.nom ?? skillName;
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
