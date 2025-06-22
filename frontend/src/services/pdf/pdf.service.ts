import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  downloadVentasReport(loteIds: string[]): Observable<Blob> {
    const url = `${this.BASE_URL}/venta/reporte/pdf`;
    return this.http.post(url, loteIds, {
      responseType: 'blob', // Esto es clave para manejar binarios
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
