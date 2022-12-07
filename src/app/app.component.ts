import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-currency-exchanger';

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.apiService.initSymbols();
  }
}
