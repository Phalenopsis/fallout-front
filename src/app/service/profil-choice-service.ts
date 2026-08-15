import { inject, Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';
import { catchError, combineLatest, map, Observable, of, shareReplay } from 'rxjs';
import { AuthService } from './auth-service';
import { CampaignApiService } from '../service/api/campaign-api.service';

@Injectable({ providedIn: 'root' })
export class ProfilChoiceService extends ChoiceService {
  FIRST_AUTO_INDEX = 3;

  private authService = inject(AuthService);
  private campaignApiService = inject(CampaignApiService);

  constructor() {
    super();
  }

  getPossiblesChoice$(): Observable<ViewOption[]> {
    const baseChoices: ViewOption[] = [
      { key: '0', value: 'Gérer mes amis', link: '/friendship' },
      { key: '1', value: 'Créer un nouveau personnage', link: '/terminal/creation' },
      { key: '2', value: 'Créer une nouvelle campagne', link: '/terminal/create-campaign' },
    ];

    return combineLatest([
      this.authService.getCurrentUser$().pipe(catchError(() => of(null))),
      this.campaignApiService.getGmCampaigns().pipe(catchError(() => of([]))),
      this.campaignApiService.getPlayerCampaigns().pipe(catchError(() => of([]))),
    ]).pipe(
      map(([user, gmCampaigns, playerCampaigns]) => {
        let key = this.FIRST_AUTO_INDEX;

        const characters = user?.characters ?? [];

        // 1. Personnages
        const unfinishedCharacters = characters.filter((c) => c.creationStatus === 'DRAFT');
        const completedCharacters = characters.filter((c) => c.creationStatus === 'COMPLETED');

        const unfinishedChoices = unfinishedCharacters.map((c) => ({
          key: (key++).toString(),
          value: `Continuer ${c.name}`,
          link: `terminal/creation/draft/${c.id}`,
        }));

        const completedChoices = completedCharacters.map((c) => ({
          key: (key++).toString(),
          value: `Jouer avec ${c.name}`,
          link: `/character/${c.id}`,
        }));

        // 2. Campagnes (MJ & Joueur)
        const gmCampaignChoices = (gmCampaigns ?? []).map((camp) => ({
          key: (key++).toString(),
          value: `[MJ] Campagne ${camp.name}`,
          link: `/campaign/${camp.id}`,
        }));

        const playerCampaignChoices = (playerCampaigns ?? []).map((camp) => ({
          key: (key++).toString(),
          value: `Campagne ${camp.name}`,
          link: `/campaign/${camp.id}`,
        }));

        return [
          ...baseChoices,
          ...unfinishedChoices,
          ...completedChoices,
          ...gmCampaignChoices,
          ...playerCampaignChoices,
          { key: (key++).toString(), value: 'Se déconnecter', link: '/logout' },
        ];
      }),
      catchError((err) => {
        console.error('Impossible de charger les données du profil', err);
        return of([...baseChoices, { key: '3', value: 'Se déconnecter', link: '/logout' }]);
      }),
      shareReplay(1),
    );
  }
}
