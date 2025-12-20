import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomeChoiceService } from './service/home-choice-service';
import { OptionTerminal } from './_option-terminal.abstract';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../service/auth-service';

@Component({
    selector: 'app-terminal-home',
    standalone: true,
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css'],   // réutilise le CSS commun
})
export class HomeTerminal extends OptionTerminal {
    choiceService: HomeChoiceService = inject(HomeChoiceService)
    authService: AuthService = inject(AuthService);

    constructor(
        protected override router: Router,
    ) {
        super(router);
    }

    ngOnInit(): void {
        this.authService.user$().subscribe(user => {
            console.log("Utilisateur courant :", user);
            if (user) {
                this.router.navigate(['/terminal/profil']);
            }
        });
    }

}
