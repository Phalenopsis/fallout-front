import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OptionTerminal } from './_option-terminal.abstract';
import { ProfilChoiceService } from '../service/profil-choice-service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-terminal-profil',
    standalone: true,
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css'],   // réutilise le CSS commun,
})
export class ProfilTerminal extends OptionTerminal {
    choiceService: ProfilChoiceService = inject(ProfilChoiceService)

    constructor(
        protected override router: Router
    ) {
        super(router);

    }
}