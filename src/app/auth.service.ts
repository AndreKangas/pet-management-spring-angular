import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8003';

  constructor(private http: HttpClient) {}

  
  login(username: string, password: string): Observable<any> {
    const headers = { 'Authorization': 'Basic ' + btoa(username + ':' + password) };
    return this.http.get<any>(`${this.apiUrl}/api/login`, { headers: headers });
  }
}
