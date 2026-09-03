import { CampaignCharacterDto } from './campaign-character.dto';

export interface CampaignResponseDto {
  id: number;
  name: string;
  gameMasterId: number;
  gameMasterEmail: string;
  members: CampaignCharacterDto[];
}
