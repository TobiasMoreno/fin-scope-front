import { Component } from '@angular/core';
import { HeaderLinksComponent } from "./header-links/header-links.component";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-header',
  imports: [HeaderLinksComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
