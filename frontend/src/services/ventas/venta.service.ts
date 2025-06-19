import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearVenta(venta: any): Observable<any> {
    const url = `${this.BASE_URL}/venta`;
    return this.http.post(url, venta);
  }

  obtenerTodasVentas(): Observable<any> {
    const url = `${this.BASE_URL}/venta`;
    return this.http.get(url);
  }

  obtenerVentasPorSucursal(idSucursal : number): Observable<any> {
    const url = `${this.BASE_URL}/venta/bySucursal?idSucursal=${idSucursal}`;
    return this.http.get(url);
  }
}
