import { SucursalDTO } from '../../core/dtos/sucursal.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSucursales(): Observable<SucursalDTO[]> {
  const url = `${this.BASE_URL}/sucursal`;
  return this.http.get<SucursalDTO[]>(url);
}
}
