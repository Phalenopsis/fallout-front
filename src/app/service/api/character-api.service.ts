import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../character/models/character.class';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private baseUrl = `${environment.apiUrl}/character`;
  constructor(private http: HttpClient) { }

  saveCharacter(characterData: Character): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}`, characterData, { withCredentials: true });
  }
}
