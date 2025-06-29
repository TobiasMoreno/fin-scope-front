import { Component, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;
  toggleSidebar = output<void>();
}
