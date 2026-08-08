import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../character/models/character.class';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CharacterFromBackDTO } from '../../character/models/character-from-back.dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private baseUrl = `${environment.apiUrl}/api/characters`;
  constructor(private http: HttpClient) {}

  saveCharacter(character: Character): Observable<CharacterFromBackDTO> {
    console.log('character : ', character);
    return this.http.post<CharacterFromBackDTO>(`${this.baseUrl}`, character.maptoDto(), {
      withCredentials: true,
    });
  }

  getCharacter(id: number): Observable<CharacterFromBackDTO> {
    return this.http.get<CharacterFromBackDTO>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  updateCharacter(character: Character): Observable<CharacterFromBackDTO> {
    return this.http.put<CharacterFromBackDTO>(
      `${this.baseUrl}/${character.id}`,
      character.maptoDto(),
      {
        withCredentials: true,
      },
    );
  }
}
