import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { ISymbol } from 'src/app/shared/models/symbol';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public amount = 25;
  public currToCurr = '';
  public result = '';
  public currencyForm: FormGroup = this.fb.group({
    from: ['EUR'],
    to: ['USD'],
  });

  public symbols: string[] = [];
  public constructor(private apiService: ApiService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.apiService
      .getSymbols()
      .pipe(take(1))
      .subscribe((val: ISymbol) => (this.symbols = Object.keys(val.symbols)));

    this.apiService
      .getConversion(
        this.currencyForm.get('from')?.value,
        this.currencyForm.get('to')?.value,
        1
      )
      .pipe(take(1))
      .subscribe((val) => {
        this.currToCurr = `1.00 ${this.currencyForm.get('from')?.value} = ${
          val.result
        } ${this.currencyForm.get('to')?.value}`;
      });
  }

  public swap(): void {
    const temp = this.currencyForm.get('from')?.value;
    this.currencyForm.setValue({
      from: this.currencyForm.get('to')?.value,
      to: temp,
    });
  }

  public convert(): void {
    this.apiService
      .getConversion(
        this.currencyForm.get('from')?.value,
        this.currencyForm.get('to')?.value,
        this.amount
      )
      .pipe(take(1))
      .subscribe((val) => (this.result = val.result.toFixed(2).toString()));
  }
}
