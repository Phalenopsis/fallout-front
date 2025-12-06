import { Routes } from '@angular/router';
import { HomeTerminal } from './terminal/home-terminal.component';
import { LoginTerminalComponent } from './terminal/login.terminal.component';
import { CharacterPage } from './character/character-page/character-page';
import { LogoutComponent } from './authentication/logout/logout';
import { Home } from './core/component/home/home';
import { RegisterTerminalComponent } from './terminal/register.terminal.component';
import { ProfilTerminal } from './terminal/profil-terminal.component';
import { AuthGuard } from './core/guard/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'terminal', pathMatch: 'full' },
    { path: 'home', redirectTo: 'terminal', pathMatch: 'full' },
    {
        path: 'terminal',
        component: Home,
        children: [
            {
                path: '', component: HomeTerminal
            },
            {
                path: 'login', component: LoginTerminalComponent
            },
            {
                path: 'register', component: RegisterTerminalComponent
            },
            {
                path: 'profil', component: ProfilTerminal, canActivate: [AuthGuard]
            }

        ]
    },
    {
        path: 'character', component: CharacterPage
    },
    {
        path: 'logout', component: LogoutComponent
    }
    /*
    { path: 'login', loadComponent: () => import('./authentication/login-terminal/login-terminal').then(m => m.TerminalLoginComponent) },
    { path: 'profil', loadComponent: () => import('./profil/profil/profil').then(m => m.Profil) }
     */
];
