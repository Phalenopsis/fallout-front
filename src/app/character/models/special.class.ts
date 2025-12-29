import { SpecialDTO } from './special.dto';
import { SpecialStats } from './special.type';

export class Special {
  public id: number | undefined;
  public strength: number;
  public perception: number;
  public endurance: number;
  public charisma: number;
  public intelligence: number;
  public agility: number;
  public luck: number;

  constructor(stats?: Partial<SpecialStats> & { id?: number }) {
    this.id = stats?.id;

    this.strength = stats?.strength ?? 5;
    this.perception = stats?.perception ?? 5;
    this.endurance = stats?.endurance ?? 5;
    this.charisma = stats?.charisma ?? 5;
    this.intelligence = stats?.intelligence ?? 5;
    this.agility = stats?.agility ?? 5;
    this.luck = stats?.luck ?? 5;
  }

  mapToDto(): SpecialDTO {
    return {
      id: this.id ?? 0,
      strength: this.strength,
      perception: this.perception,
      endurance: this.endurance,
      charisma: this.charisma,
      intelligence: this.intelligence,
      agility: this.agility,
      luck: this.luck,
    };
  }
}
