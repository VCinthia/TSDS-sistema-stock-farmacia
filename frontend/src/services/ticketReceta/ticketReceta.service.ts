import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketRecetaService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerTodosNoReportadosAnmat(): Observable<any> {
    const url = `${this.BASE_URL}/ticket-receta/noReportadosAnmat`;
    return this.http.get(url);
  }
}
