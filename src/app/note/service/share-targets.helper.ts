// Cibles disponibles pour un Joueur :
// 1. La Campagne (pour le MJ)
// 2. Les autres membres de la même campagne (exclure currentCharId)

import { CampaignCharacterDto } from '../../campaign/models/campaign-character.dto';
import { CampaignResponseDto } from '../../campaign/models/campaign-response.dto';
import { NoteShareTargetDto } from '../models/note-share-target.dto';
import { ShareTargetType } from '../models/share-target-type.enum';

export function getAvailableShareTargetsForCharacter(
  campaign: CampaignResponseDto,
  currentCharId: number,
): NoteShareTargetDto[] {
  const targets: NoteShareTargetDto[] = [
    { type: ShareTargetType.CAMPAIGN, id: campaign.id, name: campaign.name },
  ];

  campaign.members
    .filter((m) => m.status === 'ACCEPTED' && m.characterId && m.characterId !== currentCharId)
    .forEach((m) => {
      targets.push({
        type: ShareTargetType.CHARACTER,
        id: m.characterId!,
        name: m.characterName || 'Personnage sans nom',
      });
    });

  return targets;
}

// Cibles disponibles pour le MJ :
// Tous les personnages membres acceptés de la campagne

export function getAvailableShareTargetsForCampaign(
  activeCharacters: CampaignCharacterDto[],
): NoteShareTargetDto[] {
  return activeCharacters
    .filter((c) => c.characterId !== null)
    .map((c) => ({
      type: ShareTargetType.CHARACTER,
      id: c.characterId!,
      name: c.characterName || 'Personnage sans nom',
    }));
}
