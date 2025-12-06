import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../service/theme-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.html',
  styleUrls: ['./theme-switcher.css']
})
export class ThemeSwitcherComponent {

  themeService = inject(ThemeService);

  themes = ['green', 'orange'] as const;

  select(theme: 'green' | 'orange') {
    this.themeService.setTheme(theme);
  }
}
