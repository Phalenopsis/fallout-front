import { CreationStatus } from './creation-status.enum';
import { ORIGIN_VALUE } from './origin-mapping.map';
import { SpecialDTO } from './special.dto';

export interface CharacterDTO {
  id: number | undefined;
  name: string | undefined;
  userId: number | undefined;
  special: SpecialDTO | undefined;
  originName: ORIGIN_VALUE | undefined;
  creationStatus: CreationStatus;
}
