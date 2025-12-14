import { inject, Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';
import { AuthApiService } from './api/auth-api.service';
import { CharacterDTO } from '../character/models/character.dto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilChoiceService extends ChoiceService {
  authApiService: AuthApiService = inject(AuthApiService);
  actualKey: number = 1;

  constructor() {
    super();
    this.initializeChoices();
  }

  private choices: ViewOption[] = [];

  getPossiblesChoice(): ViewOption[] {
    return this.choices;
  }

  async initializeChoices() {
    this.addCreationCharacterChoice();
    await this.addCharacterChoice();
    this.addLogoutChoice();
  }

  addCharactersChoices(characters: CharacterDTO[]) {
    characters.forEach((character) => {
      this.choices.push(
        {
          key: this.actualKey.toString(),
          value: `Jouer avec ${character.name}`,
          link: `/character/${character.id}`
        });
      this.actualKey += 1;
    });
  }

  private async addCharacterChoice() {
    const user = await firstValueFrom(this.authApiService.getCurrentUser());
    const characters: CharacterDTO[] = user.characters;
    this.addCharactersChoices(characters);
  }

  addCreationCharacterChoice() {
    this.choices.push(
      {
        key: this.actualKey.toString(),
        value: "Créer un nouveau personnage",
        link: "/terminal/creation"
      });
    this.actualKey += 1;
  }

  addLogoutChoice() {
    this.choices.push(
      {
        key: this.actualKey.toString(),
        value: "Se déconnecter",
        link: "/logout"
      });
    this.actualKey += 1;
  }

}
