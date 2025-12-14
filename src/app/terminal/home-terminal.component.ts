import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeChoiceService } from './service/home-choice-service';
import { OptionTerminal } from './_option-terminal.abstract';
import { AuthApiService } from '../service/api/auth-api.service';

@Component({
    selector: 'app-terminal-home',
    standalone: true,
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']   // réutilise le CSS commun
})
export class HomeTerminal extends OptionTerminal {
    constructor(
        protected override router: Router,
        protected override choiceService: HomeChoiceService,
        private authApiService: AuthApiService
    ) {
        super(router, choiceService);
    }

    ngOnInit(): void {


        this.authApiService.getCurrentUser().subscribe(user => {
            console.log("Utilisateur courant :", user);
            this.router.navigate(['/terminal/profil']);
        });
    }

}
