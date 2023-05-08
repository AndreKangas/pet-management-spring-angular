import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetTypes } from '../models/petTypes.model';

@Injectable({
  providedIn: 'root'
})
export class PetTypesService {
  private apiUrl = 'http://localhost:8001/api/pettypes';

  constructor(private http: HttpClient) { }

  getAllPetTypes(): Observable<PetTypes[]> {
    return this.http.get<PetTypes[]>(this.apiUrl);
  }

  
  
}