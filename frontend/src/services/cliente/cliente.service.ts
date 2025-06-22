import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerClientesFidelizacion(): Observable<any> {
    const url = `${this.BASE_URL}/cliente/fidelizacion`;
    return this.http.get(url);
  }
}