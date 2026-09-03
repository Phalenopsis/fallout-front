import { Injectable, signal } from '@angular/core';
import { CampaignApiService } from '../../service/api/campaign-api.service';
import { CampaignResponseDto } from '../models/campaign-response.dto';
import { CampaignCharacterDto } from '../models/campaign-character.dto';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly gmCampaigns = signal<CampaignResponseDto[]>([]);
  readonly playerCampaigns = signal<CampaignResponseDto[]>([]);
  readonly pendingInvitations = signal<CampaignCharacterDto[]>([]);

  constructor(private campaignApiService: CampaignApiService) {}

  loadGmCampaigns(): void {
    this.campaignApiService.getGmCampaigns().subscribe({
      next: (campaigns) => this.gmCampaigns.set(campaigns),
    });
  }

  loadPendingInvitations(): void {
    this.campaignApiService.getPendingInvitations().subscribe({
      next: (invitations) => this.pendingInvitations.set(invitations),
    });
  }

  createCampaign(name: string) {
    return this.campaignApiService.createCampaign({ name }).pipe(
      tap((newCampaign) => {
        this.gmCampaigns.update((current) => [...current, newCampaign]);
      }),
      catchError((err) => {
        const errorMessage = err?.error?.error || 'Erreur lors de la création de la campagne.';
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
