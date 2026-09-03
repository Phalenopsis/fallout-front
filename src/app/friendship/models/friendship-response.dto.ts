import { InvitationStatus } from '../../invitation/models/invitation-status.enum';

export interface FriendshipResponseDto {
  friendshipId: number;
  friendUserId: number;
  friendUsername: string;
  status: InvitationStatus;
  isRequester: boolean;
}
