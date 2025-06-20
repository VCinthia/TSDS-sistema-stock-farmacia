import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearLote(lote: any): Observable<any> {
    const url = `${this.BASE_URL}/lote`;
    return this.http.post(url, lote);
  }

  obtenerTodosLotes(): Observable<any> {
    const url = `${this.BASE_URL}/lote`;
    return this.http.get(url);
  }

  obtenerLotesPorSucursal(idSucursal : number): Observable<any> {
    const url = `${this.BASE_URL}/lote/bySucursal?idSucursal=${idSucursal}`;
    return this.http.get(url);
  }

  obtenerLotesPorVencer(diasAntelacion: number ,idSucursal : number): Observable<any> {
    const url = `${this.BASE_URL}/lote/sucursal/proximosAVencer?diasDeAntelacion=${diasAntelacion}&idSucursal=${idSucursal}`;
    return this.http.get(url);
  }
}
