import { Component, computed, inject, signal } from '@angular/core';
import { CampaignStoreService } from '../../../../services/campaign-store.service';
import { CharacterPreview } from '../../../../../core/component/character-preview/character-preview';
import { CharacterApiService } from '../../../../../service/api/character-api.service';
import { InvitationStatus } from '../../../../../invitation/models/invitation-status.enum';
import { Character } from '../../../../../character/models/character.class';
import { CampaignCharacterDto } from '../../../../models/campaign-character.dto';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-pending-campaign-invitations',
  standalone: true,
  imports: [CharacterPreview, NgTemplateOutlet],
  templateUrl: './pending-campaign-invitations.html',
  styleUrls: [
    './pending-campaign-invitations.css',
    '../../../../../core/component/pipboy-layout/pipboy-page.css',
  ],
})
export class PendingCampaignInvitations {
  public campaignStore = inject(CampaignStoreService);
  private characterApiService = inject(CharacterApiService);

  readonly InvitationStatus = InvitationStatus;

  // ID de l'invitation (CampaignCharacter) actuellement dépliée
  expandedInviteId = signal<number | null>(null);

  // Personnage chargé pour la prévisualisation
  expandedCharacter = signal<Character | null>(null);
  isLoadingCharacter = signal<boolean>(false);

  pendingInvitations = computed<CampaignCharacterDto[]>(() => {
    const campaign = this.campaignStore.campaign();
    if (!campaign || !campaign.members) return [];
    return campaign.members.filter((m) => m.status === InvitationStatus.PENDING);
  });

  declinedInvitations = computed<CampaignCharacterDto[]>(() => {
    const campaign = this.campaignStore.campaign();
    if (!campaign || !campaign.members) return [];
    return campaign.members.filter((m) => m.status === InvitationStatus.DECLINED);
  });

  togglePreview(inv: CampaignCharacterDto): void {
    if (this.expandedInviteId() === inv.campaignCharacterId) {
      // Si déjà ouvert, on replie
      this.expandedInviteId.set(null);
      this.expandedCharacter.set(null);
      return;
    }

    this.expandedInviteId.set(inv.campaignCharacterId);

    if (inv.characterId) {
      this.isLoadingCharacter.set(true);
      this.characterApiService.getCharacter(inv.characterId).subscribe({
        next: (dto) => {
          const char = Character.mapFromDto(dto);
          this.expandedCharacter.set(char);
          this.isLoadingCharacter.set(false);
        },
        error: () => {
          this.expandedCharacter.set(null);
          this.isLoadingCharacter.set(false);
        },
      });
    } else {
      this.expandedCharacter.set(null);
    }
  }
}
