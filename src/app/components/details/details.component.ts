import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { ISymbol } from 'src/app/shared/models/symbol';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  public title = '';
  public amount: number = 0;
  public from = '';
  public to = '';
  private symbolsSubscription: Subscription;

  public ngOnInit(): void {
    this.route.params.forEach((params) => {
      this.from = params['from'];
      this.to = params['to'];
      this.amount = params['amount'];
    });

    this.symbolsSubscription = this.apiService.symbols$.subscribe(
      (val: ISymbol | null) => {
        if (val) {
          this.title = this.from + ' - ' + val.symbols[this.from];
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.symbolsSubscription.unsubscribe();
  }

  public back(): void {
    this.router.navigate(['']);
  }
}
