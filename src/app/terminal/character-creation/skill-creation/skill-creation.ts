import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { SkillCreationService } from './skill-creation-service';
import { Character } from '../../../character/models/character.class';
import { Router } from '@angular/router';
import { CharacterSkills, SkillName, SKILLS } from './model/skill.desc';

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
  taggedSkillsPoints: number =
    this.character.origin?.atoutGratuit || this.character.origin?.atoutAChoisirParmi ? 4 : 3;
  remainingPoints: number = 9 + (this.character.special?.intelligence ?? 0);
  skills = SKILLS;
  activeSkill: SkillName | null = null;

  obligatorySkills: SkillName[] = this.character.origin?.atoutAChoisirParmi
    ? this.character.origin?.atoutAChoisirParmi
    : [];

  remove(name: SkillName) {
    if (this.skillsCharacter[name].rank <= 0) return;
    if (this.skillsCharacter[name].taggedSkill && this.skillsCharacter[name].rank <= 2) return;
    this.skillsCharacter[name].rank -= 1;
    this.remainingPoints += 1;
  }

  add(name: SkillName) {
    if (this.remainingPoints <= 0) return;
    if (this.skillsCharacter[name].rank >= 3) return;
    this.skillsCharacter[name].rank += 1;
    this.remainingPoints -= 1;
  }

  tag(name: SkillName) {
    if (this.taggedSkillsPoints <= 0) return;
    if (
      this.obligatorySkills.length > 0 &&
      !this.obligatorySkills.includes(name) &&
      this.taggedSkillsPoints > 0
    ) {
      if (this.mustTagAnObligatorySkill()) {
        return;
      }
    }

    this.skillsCharacter[name].taggedSkill = true;
    this.skillsCharacter[name].rank += 2;
    while (this.skillsCharacter[name].rank > 3) {
      this.skillsCharacter[name].rank -= 1;
      this.remainingPoints += 1;
    }
    this.taggedSkillsPoints--;
  }

  untag(name: SkillName) {
    if (!this.skillsCharacter[name].taggedSkill) return;

    this.skillsCharacter[name].taggedSkill = false;
    this.taggedSkillsPoints++;
    this.skillsCharacter[name].rank -= 2;
    this.remainingPoints += 2;
  }

  toggleTag(name: SkillName, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.tag(name);
    } else {
      this.untag(name);
    }
  }

  setActive(skillName: SkillName) {
    this.activeSkill = skillName;
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

  mustTagAnObligatorySkill(): boolean {
    if (this.obligatorySkills.length === 0) {
      return false;
    }

    return !this.obligatorySkills.some((skill) => this.skillsCharacter[skill].taggedSkill);
  }

  get obligatorySkillLabels(): string[] {
    return this.obligatorySkills
      .map((name) => this.skills.find((s) => s.name === name))
      .filter(Boolean)
      .map((s) => s!.nom);
  }
}
