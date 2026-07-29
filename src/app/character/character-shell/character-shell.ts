import { Component, inject, OnInit, HostListener } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { MainMenuItem, SubMenuItem } from '../models/pipboy-menu.model';
import { CharacterStoreService } from '../services/character-store.service';

@Component({
  selector: 'app-character-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './character-shell.html',
  styleUrls: ['./character-shell.css'],
})
export class CharacterShell implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private characterStore = inject(CharacterStoreService);

  // Variables pour la gestion des gestes tactiles (Swipe)
  private touchStartX = 0;
  private touchEndX = 0;

  readonly menuConfig: MainMenuItem[] = [
    {
      label: 'STATS',
      path: 'stats',
      subMenus: [
        { label: 'STATUS', path: 'status' },
        { label: 'SPECIAL', path: 'special' },
        { label: 'COMPÉTENCES', path: 'skills' },
        { label: 'APTITUDES / TRAITS', path: 'perks' },
      ],
    },
    {
      label: 'DONNÉES',
      path: 'data',
      subMenus: [
        { label: 'QUÊTES', path: 'quests' },
        { label: 'RÉPUTATION', path: 'reputation' },
        { label: 'BACKGROUND', path: 'background' },
        { label: 'NOTES', path: 'notes' },
      ],
    },
    {
      label: 'INVENTAIRE',
      path: 'inventory',
      subMenus: [
        { label: 'ARMES', path: 'weapons' },
        { label: 'ARMURES', path: 'armor' },
        { label: 'DIVERS', path: 'misc' },
      ],
    },
    {
      label: 'RÉGLAGES',
      path: 'settings',
      subMenus: [],
    },
  ];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.characterStore.loadCharacter(id);
    }
  }

  // Identifie la section principale active
  get activeMainMenu(): MainMenuItem | undefined {
    const urlSegments = this.router.url.split('/');
    const currentSection = urlSegments[3] || 'stats';
    return this.menuConfig.find((m) => m.path === currentSection);
  }

  // Identifie le sous-menu actif
  get activeSubMenu(): SubMenuItem | undefined {
    const activeMain = this.activeMainMenu;
    if (!activeMain || activeMain.subMenus.length === 0) return undefined;

    const urlSegments = this.router.url.split('/');
    const currentSubSection = urlSegments[4];
    return activeMain.subMenus.find((s) => s.path === currentSubSection) || activeMain.subMenus[0];
  }

  // Index courant du sous-menu actif (pour l'affichage des traits de progression)
  get activeSubMenuIndex(): number {
    const activeMain = this.activeMainMenu;
    if (!activeMain) return 0;
    const currentSub = this.activeSubMenu;
    if (!currentSub) return 0;
    return activeMain.subMenus.findIndex((s) => s.path === currentSub.path);
  }

  // Redirige vers le premier sous-menu lors du clic sur un rectangle supérieur
  getMenuTargetUrl(main: MainMenuItem): string[] {
    const characterId = this.route.snapshot.paramMap.get('id') || '';
    if (main.subMenus.length > 0) {
      return ['/character', characterId, main.path, main.subMenus[0].path];
    }
    return ['/character', characterId, main.path];
  }

  // GESTION DU SWIPE SUR MOBILE
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const minSwipeDistance = 50; // Seuil minimum pour déclencher le swipe
    const activeMain = this.activeMainMenu;

    if (!activeMain || activeMain.subMenus.length <= 1) return;

    const currentIndex = this.activeSubMenuIndex;

    // Swipe vers la gauche -> Sous-menu suivant
    if (swipeDistance < -minSwipeDistance && currentIndex < activeMain.subMenus.length - 1) {
      this.navigateToSubMenu(activeMain.subMenus[currentIndex + 1]);
    }
    // Swipe vers la droite -> Sous-menu précédent
    else if (swipeDistance > minSwipeDistance && currentIndex > 0) {
      this.navigateToSubMenu(activeMain.subMenus[currentIndex - 1]);
    }
  }

  private navigateToSubMenu(sub: SubMenuItem) {
    const activeMain = this.activeMainMenu;
    const characterId = this.route.snapshot.paramMap.get('id') || '';
    if (activeMain) {
      this.router.navigate(['/character', characterId, activeMain.path, sub.path]);
    }
  }
}
