import { ProveedorDTO } from '../../core/dtos/proveedor.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<ProveedorDTO[]> {
  const url = `${this.BASE_URL}/proveedor`;
  return this.http.get<ProveedorDTO[]>(url);
}
}
