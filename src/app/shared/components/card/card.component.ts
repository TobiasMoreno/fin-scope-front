import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  header = input(false);
  accionsheader = input(false);
  actions = input(false);
  hoverable = input(true);
  vacancy = input.required<any>();

  get image(): boolean {
    return (
      this.vacancy().logoCompany !== undefined &&
      this.vacancy().logoCompany !== ''
    );
  }
}
