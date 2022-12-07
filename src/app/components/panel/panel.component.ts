import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { ISymbol } from 'src/app/shared/models/symbol';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() public amount = 0;
  @Input() public from = '';
  @Input() public to = '';
  @Input() public isDetails = false;
  @Output() public navigateEvent: EventEmitter<{
    from: string;
    to: string;
    amount: number;
  }> = new EventEmitter<{ from: string; to: string; amount: number }>();
  public currToCurr = '';
  public result = '';
  public currencyForm: FormGroup = this.fb.group({
    from: [''],
    to: [''],
  });

  public symbols: string[] = [];
  public constructor(private apiService: ApiService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.currencyForm.setValue({
      from: this.from,
      to: this.to,
    });
    if (this.isDetails) {
      this.currencyForm.controls['from'].disable();
    }

    this.apiService.symbols$.subscribe((val: ISymbol | null) => {
      if (val) {
        this.symbols = Object.keys(val.symbols);
      }
    });

    this.getOneToOneConversion();
  }

  public emitEvent(): void {
    this.navigateEvent.emit({
      from: this.currencyForm.get('from')?.value,
      to: this.currencyForm.get('to')?.value,
      amount: this.amount,
    });
  }

  public swap(): void {
    const temp = this.currencyForm.get('from')?.value;
    this.currencyForm.setValue({
      from: this.currencyForm.get('to')?.value,
      to: temp,
    });
    this.getOneToOneConversion();
  }

  public convert(): void {
    this.apiService
      .getConversion(
        this.currencyForm.get('from')?.value,
        this.currencyForm.get('to')?.value,
        this.amount
      )
      .pipe(take(1))
      .subscribe(
        (val) =>
          (this.result = `${val.result.toFixed(2).toString()} ${
            this.currencyForm.get('to')?.value
          }`)
      );
  }

  public get isInValidAmount(): boolean {
    return this.amount <= 0;
  }

  public getOneToOneConversion(): void {
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
}
