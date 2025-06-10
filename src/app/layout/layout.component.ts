import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  vacancy = {
    logoCompany: 'img/logo-light.jpg',
    nameCompany: 'Company Name',
    rol: 'Software Engineer',
    location: 'New York, NY',
    creationDate: '2021-01-01',
  };
}
