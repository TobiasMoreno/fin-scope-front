import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../shared/services/sidebar.service';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private sidebarService = inject(SidebarService);

  // Usar el observable del servicio
  isSidebarOpen$ = this.sidebarService.isSidebarOpen$;

  get currentUser(): User | null {
    return this.authService.currentUser;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }
}
