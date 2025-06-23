import { ProductoDTO } from '../../core/dtos/producto.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductoDTO[]> {
  const url = `${this.BASE_URL}/producto`;
  return this.http.get<ProductoDTO[]>(url);
}
  getProducto(id: string):Observable<ProductoDTO> {
  const url = `${this.BASE_URL}/producto/${id}`;
  return this.http.get<ProductoDTO>(url);
}

  getProductosStockCritico(idSucursal: number):Observable<any> {
  const url = `${this.BASE_URL}/producto/stock-critico/${idSucursal}`;
  return this.http.get(url);
}

  getProductosMasVendidos(idSucursal: number):Observable<any> {
  const url = `${this.BASE_URL}/producto/mas-vendidos/${idSucursal}`;
  return this.http.get(url);
}
}
