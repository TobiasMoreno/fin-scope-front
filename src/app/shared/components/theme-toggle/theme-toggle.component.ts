import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: ThemeMode = 'auto';
  isDarkMode: boolean = false;
  private themeSubscription?: Subscription;
  private darkModeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.getCurrentTheme().subscribe(
      theme => this.currentTheme = theme
    );
    
    this.darkModeSubscription = this.themeService.isDarkMode().subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.darkModeSubscription?.unsubscribe();
  }

  setTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }

  getThemeIcon(): string {
    if (this.currentTheme === 'auto') {
      return this.isDarkMode ? 'dark_mode' : 'light_mode';
    }
    return this.currentTheme === 'dark' ? 'dark_mode' : 'light_mode';
  }
} 