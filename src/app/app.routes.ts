import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'terminal', pathMatch: 'full' },
  { path: 'home', redirectTo: 'terminal', pathMatch: 'full' },

  {
    path: 'terminal',
    loadComponent: () => import('./core/component/home/home').then((m) => m.Home),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./terminal/home-terminal.component').then((m) => m.HomeTerminal),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./terminal/login.terminal.component').then((m) => m.LoginTerminalComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./terminal/register.terminal.component').then((m) => m.RegisterTerminalComponent),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./terminal/profil-terminal.component').then((m) => m.ProfilTerminal),
        canActivate: [authGuard],
      },
      {
        path: 'creation',
        loadComponent: () =>
          import('./terminal/character-creation/character-creation/character-creation').then(
            (m) => m.CharacterCreation,
          ),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'name',
            pathMatch: 'full',
          },
          {
            path: 'name',
            loadComponent: () =>
              import('./terminal/character-creation/name-creation/name-creation').then(
                (m) => m.NameCreation,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'special',
            loadComponent: () =>
              import('./terminal/character-creation/special-creation/special-creation').then(
                (m) => m.SpecialCreation,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'save',
            loadComponent: () =>
              import('./terminal/character-creation/save-character/save-character').then(
                (m) => m.SaveCharacter,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'origin',
            loadComponent: () =>
              import('./terminal/character-creation/origin-creation/origin-creation').then(
                (m) => m.OriginCreation,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'skill',
            loadComponent: () =>
              import('./terminal/character-creation/skill-creation/skill-creation').then(
                (m) => m.SkillCreation,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'draft/:id',
            loadComponent: () =>
              import('./terminal/character-creation/draft-creation/draft-creation').then(
                (m) => m.DraftCreation,
              ),
            canActivate: [authGuard],
          },
        ],
      },
    ],
  },

  {
    path: 'character/:id',
    loadChildren: () => import('./character/character.routes').then((m) => m.CHARACTER_ROUTES),
  },

  {
    path: 'logout',
    loadComponent: () => import('./authentication/logout/logout').then((m) => m.LogoutComponent),
  },
];
