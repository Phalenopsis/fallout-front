import {
  origineDescription,
  OrigineDescription,
} from '../../terminal/character-creation/origin-creation/origine.desc';
import { CharacterSkills } from '../../terminal/character-creation/skill-creation/model/skill.desc';
import { SkillsMapperService } from '../services/skills-mapper.service';
import { CharacterFromBackDTO } from './character-from-back.dto';
import { CharacterToBackDTO } from './character.dto';
import { CreationStatus } from './creation-status.enum';
import {
  ORIGIN_KEY,
  ORIGIN_MAPPING,
  ORIGIN_MAPPING_REVERSE,
  ORIGIN_VALUE,
} from './origin-mapping.map';
import { Special } from './special.class';

export class Character {
  id?: number;
  name?: string;
  userId?: number;
  special?: Special;
  origin?: OrigineDescription;
  creationStatus: CreationStatus = CreationStatus.DRAFT;
  skills?: CharacterSkills;

  setName(name: string): void {
    this.name = name;
  }

  mapOrigin(originDesc: OrigineDescription): ORIGIN_VALUE {
    return ORIGIN_MAPPING[originDesc.nom as ORIGIN_KEY];
  }

  maptoDto(): CharacterToBackDTO {
    return {
      id: this.id ? this.id : 0,
      name: this.name,
      userId: this.userId ? this.userId : 0,
      special: this.special?.mapToDto(),
      originName: this.origin ? this.mapOrigin(this.origin) : undefined,
      creationStatus: this.creationStatus,
      skills: this.skills ? SkillsMapperService.mapSkillsToBackDto(this.skills) : undefined,
    };
  }

  public static mapFromDto(dto: CharacterFromBackDTO): Character {
    const character = new Character();

    character.id = dto.id;
    character.name = dto.name;
    character.creationStatus = dto.creationStatus;
    if (dto.originName) {
      const originKey = ORIGIN_MAPPING_REVERSE[dto.originName];
      character.origin = origineDescription.find((orig) => orig.nom === originKey);
    }

    if (dto.special && dto.special.agility > 0) {
      character.special = new Special(dto.special);
    }

    if (dto.skills) {
      character.skills = SkillsMapperService.mapSkillsFromBackDto(dto.skills);
    }

    return character;
  }

  setCreationStatusCompleted(): void {
    this.creationStatus = CreationStatus.COMPLETED;
  }
}
