import { CharacterSkills, SkillKey } from '../model/skill.desc';

type SkillState = 'FREE' | 'MUST_TAG_OBLIGATORY' | 'NO_MORE_TAG_POINTS' | 'COMPLETE';

interface SkillContext {
  skillsCharacter: CharacterSkills;
  remainingPoints: number;
  taggedSkillsPoints: number;
  obligatorySkills: SkillKey[];
}

export class SkillFSM {
  private context: SkillContext;
  private state: SkillState;

  constructor(context: SkillContext) {
    this.context = context;
    this.state = this.computeState();
  }

  // --- Calculer l'état actuel selon les règles ---
  private computeState(): SkillState {
    if (this.mustTagAnObligatorySkill()) return 'MUST_TAG_OBLIGATORY';
    if (this.context.taggedSkillsPoints <= 0) return 'NO_MORE_TAG_POINTS';
    if (this.context.remainingPoints <= 0) return 'COMPLETE';
    return 'FREE';
  }

  // --- Vérifie si un atout obligatoire doit être choisi ---
  mustTagAnObligatorySkill(): boolean {
    if (this.context.obligatorySkills.length === 0) return false;
    for (let skill of this.context.obligatorySkills) {
      if (this.context.skillsCharacter[skill].taggedSkill) return false;
    }
    return true;
  }

  // --- Taguer un skill ---
  tag(skill: SkillKey) {
    // si plus de points de tag, ou si un skill obligatoire doit être choisi mais n'est pas celui-ci
    if (this.context.taggedSkillsPoints <= 0) return;
    if (
      this.context.obligatorySkills.length > 0 &&
      !this.context.obligatorySkills.includes(skill) &&
      this.mustTagAnObligatorySkill()
    )
      return;

    const sk = this.context.skillsCharacter[skill];
    if (!sk.taggedSkill) {
      sk.taggedSkill = true;
      sk.rank += 2;
      if (sk.rank > 3) {
        this.context.remainingPoints += sk.rank - 3;
        sk.rank = 3;
      }
      this.context.taggedSkillsPoints--;
      this.state = this.computeState();
    }
  }

  // --- Retirer le tag d’un skill ---
  untag(skill: SkillKey) {
    const sk = this.context.skillsCharacter[skill];
    if (sk.taggedSkill) {
      sk.taggedSkill = false;
      sk.rank -= 2;
      if (sk.rank < 0) sk.rank = 0;
      this.context.taggedSkillsPoints++;
      this.state = this.computeState();
    }
  }

  // --- Toggle tag depuis checkbox ---
  toggleTag(skill: SkillKey, checked: boolean) {
    if (checked) this.tag(skill);
    else this.untag(skill);
  }

  // --- Ajouter un point de skill classique ---
  addPoint(skill: SkillKey) {
    if (!this.canAdd(skill)) return;

    const sk = this.context.skillsCharacter[skill];

    sk.rank++;
    this.context.remainingPoints--;
    this.state = this.computeState();
  }

  canAdd(skill: SkillKey): boolean {
    const sk = this.context.skillsCharacter[skill];

    if (this.context.remainingPoints <= 0) return false;
    if (sk.rank >= 3) return false;

    return true;
  }

  // --- Retirer un point de skill classique ---
  removePoint(skill: SkillKey) {
    if (!this.canRemove(skill)) return;

    const sk = this.context.skillsCharacter[skill];

    sk.rank--;
    this.context.remainingPoints++;
    this.state = this.computeState();
  }

  canRemove(skill: SkillKey): boolean {
    const sk = this.context.skillsCharacter[skill];

    if (sk.rank <= 0) return false;

    // Atout : minimum 2
    if (sk.taggedSkill && sk.rank <= 2) return false;

    return true;
  }

  // --- Récupérer l’état courant pour le template ---
  getState(): SkillState {
    return this.state;
  }

  // --- Accéder au contexte complet pour mise à jour du component ---
  getContext(): SkillContext {
    return this.context;
  }
}
