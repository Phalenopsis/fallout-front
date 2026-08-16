import { InvitationStatus } from '../../invitation/models/invitation-status.enum';

export interface CampaignCharacterDto {
  campaignCharacterId: number;
  campaignId: number;
  campaignName: string;
  characterId: number | null;
  characterName: string | null;
  ownerEmail: string;
  status: InvitationStatus;
}
