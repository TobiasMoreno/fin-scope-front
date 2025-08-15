import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ExampleComponent } from "../shared/components/table/example/example.component";
import { BreadcrumbComponent } from "../shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    FooterComponent,
    ExampleComponent,
    BreadcrumbComponent
],
  templateUrl: './layout.component.html',
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
