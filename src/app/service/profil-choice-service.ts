import { inject, Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class ProfilChoiceService extends ChoiceService {
  private authService = inject(AuthService);

  constructor() {
    super();
  }

  getPossiblesChoice$(): Observable<ViewOption[]> {
    const baseChoices: ViewOption[] = [
      { key: '1', value: 'Créer un nouveau personnage', link: '/terminal/creation' },
    ];

    return this.authService.getCurrentUser$().pipe(
      map((user) => {
        console.log(user);
        let key = 2;

        const characters = user?.characters ?? [];

        // Séparer les personnages non finis et finis
        const unfinishedCharacters = characters.filter((c) => c.creationStatus === 'DRAFT');
        const completedCharacters = characters.filter((c) => c.creationStatus === 'COMPLETED');

        // Mapper chaque liste en ViewOption[]
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

        return [
          ...baseChoices,
          ...unfinishedChoices,
          ...completedChoices,
          { key: (key++).toString(), value: 'Se déconnecter', link: '/logout' },
        ];
      }),
      catchError((err) => {
        console.error('Impossible de récupérer les personnages', err);

        return of([...baseChoices, { key: '2', value: 'Se déconnecter', link: '/logout' }]);
      }),
      shareReplay(1),
    );
  }
}
