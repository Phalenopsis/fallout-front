import { inject, Injectable, signal } from '@angular/core';
import { CampaignApiService } from '../../service/api/campaign-api.service';
import { CampaignResponseDto } from '../models/campaign-response.dto';

@Injectable({
  providedIn: 'root',
})
export class CampaignStoreService {
  private campaignApiService = inject(CampaignApiService);

  // States
  readonly campaign = signal<CampaignResponseDto | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  /**
   * Charge la campagne courante en fonction de son ID
   */
  loadCampaign(campaignId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Note: Si tu as un endpoint specifique `/api/campaigns/{id}`,
    // tu pourras basculer dessus. En attendant, on recupere la liste MJ/Joueur.
    this.campaignApiService.getGmCampaigns().subscribe({
      next: (campaigns) => {
        const found = campaigns.find((c) => c.id === campaignId);
        if (found) {
          this.campaign.set(found);
          this.isLoading.set(false);
        } else {
          // Si non trouvee dans le registre MJ, on cherche cote Joueurs
          this.fetchPlayerCampaign(campaignId);
        }
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Erreur lors du chargement de la campagne.');
        this.isLoading.set(false);
      },
    });
  }

  private fetchPlayerCampaign(campaignId: number): void {
    this.campaignApiService.getPlayerCampaigns().subscribe({
      next: (campaigns) => {
        const found = campaigns.find((c) => c.id === campaignId);
        if (found) {
          this.campaign.set(found);
        } else {
          this.error.set('Campagne introuvable ou accès non autorisé.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Erreur lors du chargement de la campagne.');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Invite un personnage dans la campagne courante
   */
  inviteCharacter(characterId: number): void {
    const currentCampaign = this.campaign();
    if (!currentCampaign) return;

    this.campaignApiService.inviteCharacter(currentCampaign.id, characterId).subscribe({
      next: (updatedCampaign) => {
        this.campaign.set(updatedCampaign);
      },
      error: (err) => {
        this.error.set(err?.error?.message || "Erreur lors de l'envoi de l'invitation.");
      },
    });
  }

  /**
   * Répond à une invitation (Accepter / Refuser)
   */
  respondToInvitation(campaignCharacterId: number, accept: boolean): void {
    const apiCall = accept
      ? this.campaignApiService.acceptInvitation(campaignCharacterId)
      : this.campaignApiService.declineInvitation(campaignCharacterId);

    apiCall.subscribe({
      next: () => {
        // Recharge la campagne si elle était déjà active
        const current = this.campaign();
        if (current) {
          this.loadCampaign(current.id);
        }
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Erreur lors de la réponse à l invitation.');
      },
    });
  }

  /**
   * Réinitialise le store
   */
  clear(): void {
    this.campaign.set(null);
    this.isLoading.set(false);
    this.error.set(null);
  }
}
