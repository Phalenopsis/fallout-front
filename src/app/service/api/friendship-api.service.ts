import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FriendRequestDto } from '../../friendship/models/friend-request.dto';
import { FriendshipResponseDto } from '../../friendship/models/friendship-response.dto';

@Injectable({
  providedIn: 'root',
})
export class FriendshipApiService {
  private baseUrl = `${environment.apiUrl}/api/friends`;

  constructor(private http: HttpClient) {}

  sendFriendRequest(dto: FriendRequestDto): Observable<FriendshipResponseDto> {
    return this.http.post<FriendshipResponseDto>(`${this.baseUrl}/request`, dto, {
      withCredentials: true,
    });
  }

  getPendingRequests(): Observable<FriendshipResponseDto[]> {
    return this.http.get<FriendshipResponseDto[]>(`${this.baseUrl}/pending`, {
      withCredentials: true,
    });
  }

  getFriends(): Observable<FriendshipResponseDto[]> {
    return this.http.get<FriendshipResponseDto[]>(`${this.baseUrl}`, {
      withCredentials: true,
    });
  }

  acceptRequest(friendshipId: number): Observable<FriendshipResponseDto> {
    return this.http.post<FriendshipResponseDto>(
      `${this.baseUrl}/request/${friendshipId}/accept`,
      {},
      { withCredentials: true },
    );
  }

  declineRequest(friendshipId: number): Observable<FriendshipResponseDto> {
    return this.http.post<FriendshipResponseDto>(
      `${this.baseUrl}/request/${friendshipId}/decline`,
      {},
      { withCredentials: true },
    );
  }
}
