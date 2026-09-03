import { Component, HostListener, inject, input } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MainMenuItem, SubMenuItem } from '../../models/pipboy-menu.model';

@Component({
  selector: 'app-pipboy-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pipboy-layout.html',
  styleUrls: ['./pipboy-layout.css'],
})
export class PipboyLayoutComponent {
  private router = inject(Router);

  // Nouvelles entrées (Syntaxe Angular moderne avec Signals)
  menus = input.required<MainMenuItem[]>();
  basePath = input.required<string[]>(); // Ex: ['/character', id] ou ['/campaign', id]

  private touchStartX = 0;
  private touchEndX = 0;

  // On rend la détection d'URL robuste, peu importe la profondeur
  get activeMainMenu(): MainMenuItem | undefined {
    const urlSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
    return this.menus().find((m) => urlSegments.includes(m.path));
  }

  get activeSubMenu(): SubMenuItem | undefined {
    const activeMain = this.activeMainMenu;
    if (!activeMain || activeMain.subMenus.length === 0) return undefined;

    const urlSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
    return activeMain.subMenus.find((s) => urlSegments.includes(s.path)) || activeMain.subMenus[0];
  }

  get activeSubMenuIndex(): number {
    const activeMain = this.activeMainMenu;
    if (!activeMain) return 0;
    const currentSub = this.activeSubMenu;
    if (!currentSub) return 0;
    return activeMain.subMenus.findIndex((s) => s.path === currentSub.path);
  }

  getMenuTargetUrl(main: MainMenuItem): string[] {
    // On construit l'URL à partir du basePath fourni par le parent
    if (main.subMenus.length > 0) {
      return [...this.basePath(), main.path, main.subMenus[0].path];
    }
    return [...this.basePath(), main.path];
  }

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
    const minSwipeDistance = 50;
    const activeMain = this.activeMainMenu;

    if (!activeMain || activeMain.subMenus.length <= 1) return;

    const currentIndex = this.activeSubMenuIndex;

    if (swipeDistance < -minSwipeDistance && currentIndex < activeMain.subMenus.length - 1) {
      this.navigateToSubMenu(activeMain.subMenus[currentIndex + 1]);
    } else if (swipeDistance > minSwipeDistance && currentIndex > 0) {
      this.navigateToSubMenu(activeMain.subMenus[currentIndex - 1]);
    }
  }

  private navigateToSubMenu(sub: SubMenuItem) {
    const activeMain = this.activeMainMenu;
    if (activeMain) {
      const target = [...this.basePath(), activeMain.path, sub.path];
      this.router.navigate(target);
    }
  }
}
