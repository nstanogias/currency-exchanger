import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public constructor(private router: Router) {}

  public navigateToDetails(from: string, to: string): void {
    this.router.navigate([`details/${from}/to/${to}`, { amount: 0 }]);
  }
}
