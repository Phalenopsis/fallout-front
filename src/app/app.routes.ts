import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'terminal', pathMatch: 'full' },
    { path: 'home', redirectTo: 'terminal', pathMatch: 'full' },

    {
        path: 'terminal',
        loadComponent: () =>
            import('./core/component/home/home').then((m) => m.Home),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./terminal/home-terminal.component').then(
                        (m) => m.HomeTerminal
                    ),
            },
            {
                path: 'login',
                loadComponent: () =>
                    import('./terminal/login.terminal.component').then(
                        (m) => m.LoginTerminalComponent
                    ),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./terminal/register.terminal.component').then(
                        (m) => m.RegisterTerminalComponent
                    ),
            },
            {
                path: 'profil',
                loadComponent: () =>
                    import('./terminal/profil-terminal.component').then(
                        (m) => m.ProfilTerminal
                    ),
                canActivate: [authGuard],
            },
            {
                path: 'creating-character',
                loadComponent: () =>
                    import('./terminal/character-creation/character-name-creation.component').then(
                        (m) => m.CharacterNameCreationTerminalComponent
                    ),
                canActivate: [authGuard]
            },
            {
                path: 'creating-special',
                loadComponent: () =>
                    import('./terminal/character-creation/special-creation/special-creation').then(
                        (m) => m.SpecialCreation
                    ),
                canActivate: [authGuard]
            },
        ],
    },

    {
        path: 'character',
        loadComponent: () =>
            import('./character/character-page/character-page').then(
                (m) => m.CharacterPage
            ),
    },

    {
        path: 'logout',
        loadComponent: () =>
            import('./authentication/logout/logout').then((m) => m.LogoutComponent),
    },
];
