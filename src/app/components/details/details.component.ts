import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ISymbol } from 'src/app/shared/models/symbol';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  public title = '';
  public amount: number = 0;
  public from = '';
  public to = '';

  public ngOnInit(): void {
    this.from = this.route.snapshot.params['from'];
    this.to = this.route.snapshot.params['to'];
    this.amount = this.route.snapshot.params['amount'];
    this.apiService.symbols$.subscribe((val: ISymbol | null) => {
      if (val) {
        this.title = this.from + ' - ' + val.symbols[this.from];
      }
    });
  }

  public back(): void {
    this.location.back();
  }
}
