import { Routes } from '@angular/router';
import { CharacterShell } from './character-shell/character-shell';
import { NotesContainer } from '../note/component/notes-container/notes-container';
import { NoteType } from '../note/models/note-type.enum';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    component: CharacterShell,
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },

      // --- BRANCHE STATS ---
      {
        path: 'stats',
        children: [
          { path: '', redirectTo: 'status', pathMatch: 'full' },
          {
            path: 'status',
            loadComponent: () => import('./pages/stats/status/status').then((m) => m.Status),
          },
          {
            path: 'special',
            loadComponent: () => import('./pages/stats/special/special').then((m) => m.Special),
          },
          {
            path: 'skills',
            loadComponent: () => import('./pages/stats/skills/skills').then((m) => m.Skills),
          },
          {
            path: 'perks',
            loadComponent: () => import('./pages/stats/perks/perks').then((m) => m.Perks),
          },
        ],
      },

      // --- BRANCHE DATA ---
      {
        path: 'data',
        children: [
          { path: '', redirectTo: 'quests', pathMatch: 'full' },
          {
            path: 'quests',
            component: NotesContainer,
            data: { noteType: NoteType.QUEST },
          },
          {
            path: 'locations',
            component: NotesContainer,
            data: { noteType: NoteType.LOCATION },
          },
          { path: 'npcs', component: NotesContainer, data: { noteType: NoteType.NPC } },
          {
            path: 'background',
            component: NotesContainer,
            data: { noteType: NoteType.BACKGROUND },
          },
          {
            path: 'notes',
            component: NotesContainer,
            data: { noteType: NoteType.FREE_NOTE },
          },
          {
            path: 'reputation',
            loadComponent: () =>
              import('./pages/data/reputation/reputation').then((m) => m.Reputation),
          },
        ],
      },

      // --- BRANCHE INVENTORY ---
      {
        path: 'inventory',
        children: [
          { path: '', redirectTo: 'weapons', pathMatch: 'full' },
          {
            path: 'weapons',
            loadComponent: () => import('./pages/inventory/weapons/weapons').then((m) => m.Weapons),
          },
          {
            path: 'armor',
            loadComponent: () => import('./pages/inventory/armor/armor').then((m) => m.Armor),
          },
          {
            path: 'misc',
            loadComponent: () => import('./pages/inventory/misc/misc').then((m) => m.Misc),
          },
        ],
      },

      // --- BRANCHE SETTINGS ---
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
    ],
  },
];
