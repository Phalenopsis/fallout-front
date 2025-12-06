import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OptionTerminal } from './_option-terminal.abstract';
import { ProfilChoiceService } from '../service/profil-choice-service';

@Component({
    selector: 'app-terminal-profil',
    standalone: true,
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']   // réutilise le CSS commun
})
export class ProfilTerminal extends OptionTerminal {

    constructor(
        protected override router: Router,
        protected override choiceService: ProfilChoiceService
    ) {
        super(router, choiceService);
    }
}