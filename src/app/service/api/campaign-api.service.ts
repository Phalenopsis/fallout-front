import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CampaignResponseDto } from '../../campaign/models/campaign-response.dto';
import { CreateCampaignDto } from '../../campaign/models/create-campaign.dto';
import { CampaignCharacterDto } from '../../campaign/models/campaign-character.dto';

@Injectable({
  providedIn: 'root',
})
export class CampaignApiService {
  private baseUrl = `${environment.apiUrl}/api/campaigns`;

  constructor(private http: HttpClient) {}

  createCampaign(dto: CreateCampaignDto): Observable<CampaignResponseDto> {
    return this.http.post<CampaignResponseDto>(`${this.baseUrl}`, dto, {
      withCredentials: true,
    });
  }

  inviteCharacter(campaignId: number, characterId: number): Observable<CampaignResponseDto> {
    return this.http.post<CampaignResponseDto>(
      `${this.baseUrl}/${campaignId}/invite/${characterId}`,
      {},
      { withCredentials: true },
    );
  }

  acceptInvitation(campaignCharacterId: number): Observable<CampaignCharacterDto> {
    return this.http.post<CampaignCharacterDto>(
      `${this.baseUrl}/invitations/${campaignCharacterId}/accept`,
      {},
      { withCredentials: true },
    );
  }

  declineInvitation(campaignCharacterId: number): Observable<CampaignCharacterDto> {
    return this.http.post<CampaignCharacterDto>(
      `${this.baseUrl}/invitations/${campaignCharacterId}/decline`,
      {},
      { withCredentials: true },
    );
  }

  getGmCampaigns(): Observable<CampaignResponseDto[]> {
    return this.http.get<CampaignResponseDto[]>(`${this.baseUrl}/gm`, {
      withCredentials: true,
    });
  }

  getPlayerCampaigns(): Observable<CampaignResponseDto[]> {
    return this.http.get<CampaignResponseDto[]>(`${this.baseUrl}/player`, {
      withCredentials: true,
    });
  }

  getPendingInvitations(): Observable<CampaignCharacterDto[]> {
    return this.http.get<CampaignCharacterDto[]>(`${this.baseUrl}/invitations/pending`, {
      withCredentials: true,
    });
  }
}
