import { HttpClient, HttpParams } from '@angular/common/http'; // Remplace par HttpClient Angular natif fourni par inject(HttpClient)
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNoteDto } from '../../note/models/create-note.dto';
import { NoteResponseDto } from '../../note/models/note-response.dto';
import { NoteType } from '../../note/models/note-type.enum';
import { NoteSummaryDto } from '../../note/models/note-summary.dto';
import { UpdateNoteDto } from '../../note/models/update-note.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/notes`;

  // --- CRÉATION ---

  createForCharacter(characterId: number, dto: CreateNoteDto): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(`${this.baseUrl}/character/${characterId}`, dto);
  }

  createForCampaign(campaignId: number, dto: CreateNoteDto): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(`${this.baseUrl}/campaign/${campaignId}`, dto);
  }

  // --- LECTURE (DÉTAIL) ---

  getForCharacter(characterId: number, noteId: number): Observable<NoteResponseDto> {
    return this.http.get<NoteResponseDto>(`${this.baseUrl}/character/${characterId}/${noteId}`);
  }

  getForCampaign(campaignId: number, noteId: number): Observable<NoteResponseDto> {
    return this.http.get<NoteResponseDto>(`${this.baseUrl}/campaign/${campaignId}/${noteId}`);
  }

  // --- LISTES (SYNTHÈSE) ---

  listForCharacter(characterId: number, type: NoteType): Observable<NoteSummaryDto[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<NoteSummaryDto[]>(`${this.baseUrl}/character/${characterId}`, { params });
  }

  listForCampaign(campaignId: number, type: NoteType): Observable<NoteSummaryDto[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<NoteSummaryDto[]>(`${this.baseUrl}/campaign/${campaignId}`, { params });
  }

  completeListForCharacter(characterId: number): Observable<NoteSummaryDto[]> {
    return this.http.get<NoteSummaryDto[]>(`${this.baseUrl}/character/${characterId}/all`);
  }

  completeListForCampaign(campaignId: number): Observable<NoteSummaryDto[]> {
    return this.http.get<NoteSummaryDto[]>(`${this.baseUrl}/campaign/${campaignId}/all`);
  }

  // --- MODIFICATION ---

  updateForCharacter(
    characterId: number,
    noteId: number,
    dto: UpdateNoteDto,
  ): Observable<NoteResponseDto> {
    return this.http.put<NoteResponseDto>(
      `${this.baseUrl}/character/${characterId}/${noteId}`,
      dto,
    );
  }

  updateForCampaign(
    campaignId: number,
    noteId: number,
    dto: UpdateNoteDto,
  ): Observable<NoteResponseDto> {
    return this.http.put<NoteResponseDto>(`${this.baseUrl}/campaign/${campaignId}/${noteId}`, dto);
  }

  // --- PARTAGES ---

  shareCharacterNoteWithCharacter(
    characterId: number,
    noteId: number,
    targetCharacterId: number,
  ): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(
      `${this.baseUrl}/character/${characterId}/${noteId}/share/character/${targetCharacterId}`,
      {},
    );
  }

  shareCharacterNoteWithCampaign(
    characterId: number,
    noteId: number,
    campaignId: number,
  ): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(
      `${this.baseUrl}/character/${characterId}/${noteId}/share/campaign/${campaignId}`,
      {},
    );
  }

  shareCampaignNoteWithCharacter(
    campaignId: number,
    noteId: number,
    targetCharacterId: number,
  ): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(
      `${this.baseUrl}/campaign/${campaignId}/${noteId}/share/character/${targetCharacterId}`,
      {},
    );
  }

  revokeCharacterNoteShareFromCharacter(
    characterId: number,
    noteId: number,
    targetCharacterId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/character/${characterId}/${noteId}/share/character/${targetCharacterId}`,
    );
  }

  revokeCharacterNoteShareFromCampaign(
    characterId: number,
    noteId: number,
    campaignId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/character/${characterId}/${noteId}/share/campaign/${campaignId}`,
    );
  }

  revokeCampaignNoteShareFromCharacter(
    campaignId: number,
    noteId: number,
    targetCharacterId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/campaign/${campaignId}/${noteId}/share/character/${targetCharacterId}`,
    );
  }

  // --- COPIE ---

  copyToCharacter(characterId: number, noteId: number): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(
      `${this.baseUrl}/character/${characterId}/${noteId}/copy`,
      {},
    );
  }

  copyToCampaign(campaignId: number, noteId: number): Observable<NoteResponseDto> {
    return this.http.post<NoteResponseDto>(
      `${this.baseUrl}/campaign/${campaignId}/${noteId}/copy`,
      {},
    );
  }

  // --- DIRECTORY ---

  updateDirectoryForCharacter(
    characterId: number,
    noteId: number,
    directory: string,
  ): Observable<NoteResponseDto> {
    return this.http.put<NoteResponseDto>(
      `${this.baseUrl}/character/${characterId}/${noteId}/directory`,
      { directory },
    );
  }

  updateDirectoryForCampaign(
    campaignId: number,
    noteId: number,
    directory: string,
  ): Observable<NoteResponseDto> {
    return this.http.put<NoteResponseDto>(
      `${this.baseUrl}/campaign/${campaignId}/${noteId}/directory`,
      { directory },
    );
  }

  // --- SUPPRESSION ---

  deleteForCharacter(characterId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/character/${characterId}/${noteId}`);
  }

  deleteForCampaign(campaignId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/campaign/${campaignId}/${noteId}`);
  }
}
