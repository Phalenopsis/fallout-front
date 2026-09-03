import { Component, inject, OnInit, signal } from '@angular/core';

import { CampaignApiService } from '../../../service/api/campaign-api.service';
import { CharacterApiService } from '../../../service/api/character-api.service';
import { CharacterPreview } from '../../../core/component/character-preview/character-preview';
import { CampaignCharacterDto } from '../../../campaign/models/campaign-character.dto';
import { Character } from '../../../character/models/character.class';

@Component({
  selector: 'app-pending-campaign-invitation',
  standalone: true,
  imports: [CharacterPreview],
  templateUrl: './pending-campaign-invitation.html',
  styleUrls: [
    './pending-campaign-invitation.css',
    './../../../core/component/pipboy-layout/pipboy-page.css',
  ],
})
export class PendingCampaignInvitations implements OnInit {
  private campaignApiService = inject(CampaignApiService);
  private characterApiService = inject(CharacterApiService);

  readonly pendingInvitations = signal<CampaignCharacterDto[]>([]);

  // Invitation actuellement dépliée
  readonly expandedInviteId = signal<number | null>(null);

  // Personnage chargé pour la prévisualisation
  readonly expandedCharacter = signal<Character | null>(null);

  readonly isLoadingCharacter = signal(false);

  ngOnInit(): void {
    this.loadPendingInvitations();
  }

  private loadPendingInvitations(): void {
    this.campaignApiService.getPendingInvitations().subscribe({
      next: (invitations) => {
        this.pendingInvitations.set(invitations);
      },
      error: (err) => {
        console.error('Impossible de charger les invitations de campagnes', err);
        this.pendingInvitations.set([]);
      },
    });
  }

  togglePreview(invitation: CampaignCharacterDto): void {
    if (this.expandedInviteId() === invitation.campaignCharacterId) {
      this.closePreview();
      return;
    }

    this.expandedInviteId.set(invitation.campaignCharacterId);
    this.expandedCharacter.set(null);

    if (!invitation.characterId) {
      return;
    }

    this.loadCharacter(invitation.characterId);
  }

  private loadCharacter(characterId: number): void {
    this.isLoadingCharacter.set(true);

    this.characterApiService.getCharacter(characterId).subscribe({
      next: (dto) => {
        this.expandedCharacter.set(Character.mapFromDto(dto));
        this.isLoadingCharacter.set(false);
      },
      error: (err) => {
        console.error('Impossible de charger le personnage pour la prévisualisation', err);
        this.expandedCharacter.set(null);
        this.isLoadingCharacter.set(false);
      },
    });
  }

  onAccept(invitation: CampaignCharacterDto): void {
    this.campaignApiService.acceptInvitation(invitation.campaignCharacterId).subscribe({
      next: () => {
        this.closePreview();
        this.loadPendingInvitations();
      },
      error: (err) => {
        console.error("Impossible d'accepter l'invitation de campagne", err);
      },
    });
  }

  onDecline(invitation: CampaignCharacterDto): void {
    this.campaignApiService.declineInvitation(invitation.campaignCharacterId).subscribe({
      next: () => {
        this.closePreview();
        this.loadPendingInvitations();
      },
      error: (err) => {
        console.error("Impossible de refuser l'invitation de campagne", err);
      },
    });
  }

  private closePreview(): void {
    this.expandedInviteId.set(null);
    this.expandedCharacter.set(null);
    this.isLoadingCharacter.set(false);
  }
}
