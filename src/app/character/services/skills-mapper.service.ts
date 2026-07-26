import { Injectable } from '@angular/core';
import {
  CharacterSkills,
  SkillKey,
  SkillLevel,
} from '../../terminal/character-creation/skill-creation/model/skill.desc';
import { SkillsToBackDTO } from '../models/skills-back.dto';
import { SkillsFromBackDTO } from '../models/character-from-back.dto';

@Injectable({
  providedIn: 'root',
})
export class SkillsMapperService {
  public static mapSkillsToBackDto(
    skills: CharacterSkills | undefined = undefined,
  ): SkillsToBackDTO | undefined {
    if (skills == undefined) return undefined;
    return {
      energyWeapons: skills.energyWeapons.rank,
      isEnergyWeaponsTagSkill: skills.energyWeapons.taggedSkill,

      meleeWeapons: skills.meleeWeapons.rank,
      isMeleeWeaponsTagSkill: skills.meleeWeapons.taggedSkill,

      smallGuns: skills.smallGuns.rank,
      isSmallGunsTagSkill: skills.smallGuns.taggedSkill,

      bigGuns: skills.bigGuns.rank,
      isBigGunsTagSkill: skills.bigGuns.taggedSkill,

      athletics: skills.athletics.rank,
      isAthleticsTagSkill: skills.athletics.taggedSkill,

      lockpick: skills.lockpick.rank,
      isLockpickTagSkill: skills.lockpick.taggedSkill,

      speech: skills.speech.rank,
      isSpeechTagSkill: skills.speech.taggedSkill,

      sneak: skills.sneak.rank,
      isSneakTagSkill: skills.sneak.taggedSkill,

      explosives: skills.explosives.rank,
      isExplosivesTagSkill: skills.explosives.taggedSkill,

      unarmed: skills.unarmed.rank,
      isUnarmedTagSkill: skills.unarmed.taggedSkill,

      medicine: skills.medicine.rank,
      isMedicineTagSkill: skills.medicine.taggedSkill,

      pilot: skills.pilot.rank,
      isPilotTagSkill: skills.pilot.taggedSkill,

      throwing: skills.throwing.rank,
      isThrowingTagSkill: skills.throwing.taggedSkill,

      repair: skills.repair.rank,
      isRepairTagSkill: skills.repair.taggedSkill,

      science: skills.science.rank,
      isScienceTagSkill: skills.science.taggedSkill,

      survival: skills.survival.rank,
      isSurvivalTagSkill: skills.survival.taggedSkill,

      barter: skills.barter.rank,
      isBarterTagSkill: skills.barter.taggedSkill,
    };
  }

  public static mapSkillsFromBackDto(dto: SkillsFromBackDTO[]): CharacterSkills {
    return {
      energyWeapons: this.mapSkill('energyWeapons', dto),
      meleeWeapons: this.mapSkill('meleeWeapons', dto),
      smallGuns: this.mapSkill('smallGuns', dto),
      bigGuns: this.mapSkill('bigGuns', dto),
      athletics: this.mapSkill('athletics', dto),
      lockpick: this.mapSkill('lockpick', dto),
      speech: this.mapSkill('speech', dto),
      sneak: this.mapSkill('sneak', dto),
      explosives: this.mapSkill('explosives', dto),
      unarmed: this.mapSkill('unarmed', dto),
      medicine: this.mapSkill('medicine', dto),
      pilot: this.mapSkill('pilot', dto),
      throwing: this.mapSkill('throwing', dto),
      repair: this.mapSkill('repair', dto),
      science: this.mapSkill('science', dto),
      survival: this.mapSkill('survival', dto),
      barter: this.mapSkill('barter', dto),
    };
  }

  public static mapSkill(name: SkillKey, dto: any): SkillLevel {
    return {
      name,
      rank: dto[name] as number,
      taggedSkill: dto[`is${this.capitalize(name)}TagSkill`] as boolean,
      isOffered: false,
    };
  }

  public static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
