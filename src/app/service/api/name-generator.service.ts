import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NameGeneratorService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/names`;

  generateNames(gender: 'MALE' | 'FEMALE' | 'NEUTRAL', count = 5): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/generate`, { params: { gender, count } });
  }

  generateSuperMutantNames(count = 5): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/super-mutant`, { params: { count } });
  }
}
