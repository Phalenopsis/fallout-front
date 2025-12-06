import { Injectable } from '@angular/core';
import { ViewOption } from '../terminal/model/view-option';
import { ChoiceService } from '../terminal/service/choice-service';


@Injectable({
    providedIn: 'root',
})
export class AuthChoiceService extends ChoiceService {
    private choices: ViewOption[] = [
        {
            key: "1",
            value: "Créer un compte",
            link: "/terminal/register"
        },
        {
            "key": "2",
            "value": "Se connecter",
            link: "/terminal/login"
        }
    ];

    getPossiblesChoice(): ViewOption[] {
        return this.choices;
    }
}
