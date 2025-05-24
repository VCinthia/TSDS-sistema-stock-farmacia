import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../../core/dtos/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ success: boolean; message: string; data: UsuarioDTO }> {
    const body = { email, password };
    const url = `${this.BASE_URL}/usuario/login`;
    return this.http.post<{ success: boolean; message: string; data: UsuarioDTO }>(url, body);
  }

  logout(): Observable<any> {
    return this.http.post('', {});
  }
}