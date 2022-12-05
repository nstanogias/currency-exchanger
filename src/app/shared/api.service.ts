import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConversion } from './models/conversion';
import { ISymbol } from './models/symbol';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private client: HttpClient) {}

  public getSymbols(): Observable<ISymbol> {
    return this.client.get<ISymbol>('https://api.apilayer.com/fixer/symbols');
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
