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

  private BASE_VALUE = 5;

  constructor(stats?: Partial<SpecialStats> & { id?: number }) {
    this.id = stats?.id;

    this.strength = stats?.strength ?? this.BASE_VALUE;
    this.perception = stats?.perception ?? this.BASE_VALUE;
    this.endurance = stats?.endurance ?? this.BASE_VALUE;
    this.charisma = stats?.charisma ?? this.BASE_VALUE;
    this.intelligence = stats?.intelligence ?? this.BASE_VALUE;
    this.agility = stats?.agility ?? this.BASE_VALUE;
    this.luck = stats?.luck ?? this.BASE_VALUE;
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

  getTotalPoints(): number {
    return (
      this.strength +
      this.perception +
      this.endurance +
      this.charisma +
      this.intelligence +
      this.agility +
      this.luck
    );
  }
}
