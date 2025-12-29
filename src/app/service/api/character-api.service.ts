import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../character/models/character.class';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CharacterDTO } from '../../character/models/character.dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private baseUrl = `${environment.apiUrl}/character`;
  constructor(private http: HttpClient) {}

  saveCharacter(character: Character): Observable<CharacterDTO> {
    console.log('character : ', character);
    return this.http.post<CharacterDTO>(`${this.baseUrl}`, character.maptoDto(), {
      withCredentials: true,
    });
  }

  getCharacter(id: number): Observable<CharacterDTO> {
    return this.http.get<CharacterDTO>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  updateCharacter(character: Character): Observable<CharacterDTO> {
    return this.http.put<CharacterDTO>(`${this.baseUrl}/${character.id}`, character.maptoDto(), {
      withCredentials: true,
    });
  }
}
