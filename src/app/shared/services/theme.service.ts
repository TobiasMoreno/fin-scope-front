import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeMode>('auto');
  private renderer: Renderer2;
  private isDark = new BehaviorSubject<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    console.log('Initializing theme, saved theme:', savedTheme);
    
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('auto');
    }
  }

  getCurrentTheme(): Observable<ThemeMode> {
    return this.currentTheme.asObservable();
  }

  getCurrentThemeValue(): ThemeMode {
    return this.currentTheme.value;
  }

  isDarkMode(): Observable<boolean> {
    return this.isDark.asObservable();
  }

  isDarkModeValue(): boolean {
    return this.isDark.value;
  }

  setTheme(theme: ThemeMode): void {
    console.log('Setting theme to:', theme);
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'auto') {
      this.applyAutoTheme();
    } else {
      this.applyTheme(theme === 'dark');
    }
  }

  private applyAutoTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('Auto theme - prefers dark:', prefersDark);
    this.applyTheme(prefersDark);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      console.log('System theme changed to:', e.matches ? 'dark' : 'light');
      this.applyTheme(e.matches);
    });
  }

  private applyTheme(isDark: boolean): void {
    console.log('Applying theme - isDark:', isDark);
    this.isDark.next(isDark);
    
    // Aplicar la clase directamente al documentElement
    if (isDark) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to document');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from document');
    }
    
    // Verificar que la clase se aplicó correctamente
    setTimeout(() => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      console.log('Document has dark class:', hasDarkClass);
    }, 100);
  }

  toggleTheme(): void {
    const current = this.currentTheme.value;
    if (current === 'auto') {
      this.setTheme('light');
    } else if (current === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('auto');
    }
  }
} 