import { Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';

@Injectable({
  providedIn: 'root',
})
export class ProfilChoiceService extends ChoiceService {
  private choices: ViewOption[] = [
    {
      key: "1",
      value: "Créer un nouveau personnage",
      link: "/home"
    },
    {
      "key": "2",
      "value": "Jouer avec Bob la Goule",
      link: "/character"
    },
    {
      "key": "3",
      "value": "Créer une nouvelle campagne en tant que MJ",
      link: ""
    },
    {
      "key": "4",
      "value": "Commencer une nouvelle campagne",
      link: ""
    },
    {
      "key": "5",
      "value": "Se déconnecter",
      link: "/logout"
    }
  ]

  getPossiblesChoice(): ViewOption[] {
    return this.choices;
  }
}
