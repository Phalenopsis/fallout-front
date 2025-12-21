import { SpecialKey } from '../../terminal/character-creation/special-creation/special-mod-service';
import { SpecialDTO } from './special.dto';

export class Special {
  public id: number | undefined;
  public strength: number;
  public perception: number;
  public endurance: number;
  public charisma: number;
  public intelligence: number;
  public agility: number;
  public luck: number;

  constructor(specialDTO: SpecialDTO | undefined | Record<SpecialKey, number> = undefined) {
    if (specialDTO && typeof specialDTO === 'object' && 'id' in specialDTO) this.id = specialDTO.id;
    this.strength = specialDTO ? specialDTO.strength : 5;
    this.perception = specialDTO ? specialDTO.perception : 5;
    this.endurance = specialDTO ? specialDTO.endurance : 5;
    this.charisma = specialDTO ? specialDTO.charisma : 5;
    this.intelligence = specialDTO ? specialDTO.intelligence : 5;
    this.agility = specialDTO ? specialDTO.agility : 5;
    this.luck = specialDTO ? specialDTO.luck : 5;
  }
}
