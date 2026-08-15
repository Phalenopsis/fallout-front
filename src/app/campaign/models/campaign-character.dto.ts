import { InvitationStatus } from '../../invitation/models/invitation-status.enum';

export interface CampaignCharacterDto {
  campaignCharacterId: number;
  characterId: number | null;
  characterName: string | null;
  ownerEmail: string;
  status: InvitationStatus;
}
