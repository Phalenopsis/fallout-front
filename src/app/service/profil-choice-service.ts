import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of, shareReplay } from 'rxjs';

import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';
import { AuthService } from './auth-service';
import { CampaignApiService } from '../service/api/campaign-api.service';
import { FriendshipApiService } from '../service/api/friendship-api.service';
import { UserDomainDTO } from '../core/models/user-domain.dto';
import { CampaignResponseDto } from '../campaign/models/campaign-response.dto';
import { CampaignCharacterDto } from '../campaign/models/campaign-character.dto';
import { FriendshipResponseDto } from '../friendship/models/friendship-response.dto';
import { CharacterFromBackDTO } from '../character/models/character-from-back.dto';

type ChoiceWithoutKey = Omit<ViewOption, 'key'>;

@Injectable({ providedIn: 'root' })
export class ProfilChoiceService extends ChoiceService {
  private authService = inject(AuthService);
  private campaignApiService = inject(CampaignApiService);
  private friendshipApiService = inject(FriendshipApiService);

  constructor() {
    super();
  }

  getPossiblesChoice$(): Observable<ViewOption[]> {
    return combineLatest([
      this.getCurrentUser$(),
      this.getGmCampaigns$(),
      this.getPendingCampaignInvitations$(),
      this.getPendingFriendRequests$(),
    ]).pipe(
      map(([user, gmCampaigns, pendingCampaignInvitations, pendingFriendRequests]) =>
        this.buildChoices(user, gmCampaigns, pendingCampaignInvitations, pendingFriendRequests),
      ),
      catchError((err) => {
        return of(this.buildFallbackChoices());
      }),
      shareReplay(1),
    );
  }

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  private getCurrentUser$(): Observable<UserDomainDTO | null> {
    return this.authService.getCurrentUser$().pipe(catchError(() => of(null)));
  }

  private getGmCampaigns$(): Observable<CampaignResponseDto[]> {
    return this.campaignApiService.getGmCampaigns().pipe(catchError(() => of([])));
  }

  private getPendingCampaignInvitations$(): Observable<CampaignCharacterDto[]> {
    return this.campaignApiService.getPendingInvitations().pipe(catchError(() => of([])));
  }

  private getPendingFriendRequests$(): Observable<FriendshipResponseDto[]> {
    return this.friendshipApiService.getPendingRequests().pipe(catchError(() => of([])));
  }

  // ---------------------------------------------------------------------------
  // Construction du menu
  // ---------------------------------------------------------------------------

  private buildChoices(
    user: UserDomainDTO | null,
    gmCampaigns: CampaignResponseDto[],
    pendingCampaignInvitations: CampaignCharacterDto[],
    pendingFriendRequests: FriendshipResponseDto[],
  ): ViewOption[] {
    const choices: ChoiceWithoutKey[] = [
      ...this.buildBaseChoices(pendingFriendRequests.length, pendingCampaignInvitations.length),
      ...this.buildCharacterChoices(user?.characters ?? []),
      ...this.buildCampaignChoices(gmCampaigns),
      this.buildLogoutChoice(),
    ];

    return this.addKeys(choices);
  }

  private buildBaseChoices(
    pendingFriendRequestsCount: number,
    pendingCampaignInvitationsCount: number,
  ): ChoiceWithoutKey[] {
    return [
      {
        value: this.buildFriendshipChoiceLabel(
          pendingFriendRequestsCount,
          pendingCampaignInvitationsCount,
        ),
        link: '/friendship',
      },
      {
        value: 'Créer un nouveau personnage',
        link: '/terminal/creation',
      },
      {
        value: 'Créer une nouvelle campagne',
        link: '/terminal/create-campaign',
      },
    ];
  }

  private buildCharacterChoices(characters: CharacterFromBackDTO[]): ChoiceWithoutKey[] {
    const unfinishedCharacters = characters.filter(
      (character) => character.creationStatus === 'DRAFT',
    );

    const completedCharacters = characters.filter(
      (character) => character.creationStatus === 'COMPLETED',
    );

    return [
      ...unfinishedCharacters.map((character) => ({
        value: `Continuer ${character.name}`,
        link: `/terminal/creation/draft/${character.id}`,
      })),
      ...completedCharacters.map((character) => ({
        value: `Jouer avec ${character.name}`,
        link: `/character/${character.id}`,
      })),
    ];
  }

  private buildCampaignChoices(gmCampaigns: CampaignResponseDto[]): ChoiceWithoutKey[] {
    return [
      ...gmCampaigns.map((campaign) => ({
        value: `[MJ] Campagne ${campaign.name}`,
        link: `/campaign/${campaign.id}`,
      })),
    ];
  }

  private buildLogoutChoice(): ChoiceWithoutKey {
    return {
      value: 'Se déconnecter',
      link: '/logout',
    };
  }

  // ---------------------------------------------------------------------------
  // Notifications
  // ---------------------------------------------------------------------------

  private buildFriendshipChoiceLabel(
    pendingFriendRequestsCount: number,
    pendingCampaignInvitationsCount: number,
  ): string {
    const pendingParts: string[] = [];

    if (pendingFriendRequestsCount > 0) {
      pendingParts.push(
        `${pendingFriendRequestsCount} demande${
          pendingFriendRequestsCount > 1 ? 's' : ''
        } d'ami${pendingFriendRequestsCount > 1 ? 's' : ''}`,
      );
    }

    if (pendingCampaignInvitationsCount > 0) {
      pendingParts.push(
        `${pendingCampaignInvitationsCount} invitation${
          pendingCampaignInvitationsCount > 1 ? 's' : ''
        } de campagne${pendingCampaignInvitationsCount > 1 ? 's' : ''}`,
      );
    }

    if (pendingParts.length === 0) {
      return 'Gérer mes amis';
    }

    return `Gérer mes amis (En attente : ${pendingParts.join(', ')})`;
  }

  // ---------------------------------------------------------------------------
  // Utilitaires
  // ---------------------------------------------------------------------------

  private addKeys(choices: ChoiceWithoutKey[]): ViewOption[] {
    return choices.map((choice, index) => ({
      ...choice,
      key: index.toString(),
    }));
  }

  private buildFallbackChoices(): ViewOption[] {
    return this.addKeys(this.buildBaseChoices(0, 0).concat(this.buildLogoutChoice()));
  }
}
