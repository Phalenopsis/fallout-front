import { Injectable } from "@angular/core";
import { ViewOption } from "../model/view-option";
import { ChoiceService } from "./choice-service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeChoiceService extends ChoiceService {
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

    getPossiblesChoice$(): Observable<ViewOption[]> {
        return of(this.choices);
    }
}
