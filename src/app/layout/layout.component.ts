import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ExampleComponent } from '../shared/components/table/example/example.component';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { AuthService } from '../core/services/auth.service';
import { SidebarService } from '../shared/services/sidebar.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    FooterComponent,
    ExampleComponent,
    BreadcrumbComponent,
    AsyncPipe,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private sidebarService = inject(SidebarService);
  
  // Usar observables para reactividad
  currentUser = this.authService.currentUser;
  isSidebarOpen$ = this.sidebarService.isSidebarOpen$;
  
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
