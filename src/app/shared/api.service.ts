import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISymbol } from './models/symbol';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private client: HttpClient) {}

  public getSymbols(): Observable<ISymbol> {
    return this.client.get<ISymbol>('https://api.apilayer.com/fixer/symbols');
  }
}
