import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteAnmatService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  reporteAnmat(codigosReceta: string[]): Observable<any> {
  const body = { codigos_receta: codigosReceta };
 
  return this.http.post<any>(
    `${this.BASE_URL}/reporte-anmat/reporteAnmat`,
    body,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
}
