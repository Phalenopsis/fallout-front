import { inject, Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';
import { AuthApiService } from './api/auth-api.service';
import { CharacterDTO } from '../character/models/character.dto';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfilChoiceService extends ChoiceService {

  private choicesSubject = new BehaviorSubject<ViewOption[]>([]); // hot observable
  choices$ = this.choicesSubject.asObservable();
  private actualKey = 1;

  constructor(private authApiService: AuthApiService) {
    super();
    this.loadChoices(); // lancer dès l'instanciation
  }

  getPossiblesChoice$(): Observable<ViewOption[]> {
    return this.choices$;
  }

  private async loadChoices() {
    const choices: ViewOption[] = [];

    // Création + logout synchrones
    choices.push({ key: (this.actualKey++).toString(), value: "Créer un nouveau personnage", link: "/terminal/creation" });

    try {
      const user = await firstValueFrom(this.authApiService.getCurrentUser());
      user.characters.forEach(c => {
        choices.push({ key: (this.actualKey++).toString(), value: `Jouer avec ${c.name}`, link: `/character/${c.id}` });
      });
    } catch (err) {
      console.error("Impossible de récupérer les personnages", err);
    }

    choices.push({ key: (this.actualKey++).toString(), value: "Se déconnecter", link: "/logout" });

    this.choicesSubject.next(choices); // déclenche l'émission
  }
}
