import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public constructor(private router: Router) {}

  public navigateToDetails(ev: {
    from: string;
    to: string;
    amount: number;
  }): void {
    this.router.navigate([
      `details/${ev.from}/to/${ev.to}`,
      { amount: ev.amount },
    ]);
  }
}
