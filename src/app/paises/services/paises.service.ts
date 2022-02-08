import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  private _baseUrl: string = 'https://restcountries.com/v3.1'

  get regiones(): string[] {
    return [...this._regiones]
  }

  constructor(private httpSvc: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=name,cca2`
    return this.httpSvc.get<PaisSmall[]>(url)
  }

  getPaisPorCCA2(cca2: string): Observable<Pais | null> {

    if(!cca2){
      return of(null)
    }

    const url: string = `${this._baseUrl}/alpha/${cca2}`
    return this.httpSvc.get<Pais>(url)
  }

}
