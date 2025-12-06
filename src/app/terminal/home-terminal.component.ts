import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeChoiceService } from './service/home-choice-service';
import { OptionTerminal } from './_option-terminal.abstract';

@Component({
    selector: 'app-terminal-home',
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']   // réutilise le CSS commun
})
export class HomeTerminal extends OptionTerminal {

    constructor(
        protected override router: Router,
        protected override choiceService: HomeChoiceService
    ) {
        super(router, choiceService);
    }
}
