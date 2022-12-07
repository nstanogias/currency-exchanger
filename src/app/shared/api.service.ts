import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { IConversion } from './models/conversion';
import { ISymbol } from './models/symbol';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private symbols$$ = new BehaviorSubject<ISymbol | null>(null);
  public symbols$: Observable<ISymbol | null> = this.symbols$$.asObservable();

  public constructor(private client: HttpClient) {}

  public initSymbols(): void {
    this.client
      .get<ISymbol>('https://api.apilayer.com/fixer/symbols')
      .pipe(take(1))
      .subscribe((val) => this.symbols$$.next(val));
  }

  public getConversion(
    from: string,
    to: string,
    amount: number
  ): Observable<IConversion> {
    return this.client.get<IConversion>(
      `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`
    );
  }
}
