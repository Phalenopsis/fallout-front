import { NoteShareTargetDto } from './note-share-target.dto';
import { NoteType } from './note-type.enum';

export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  type: NoteType;

  campaignId: number | null;
  characterId: number | null;

  directory: string;

  ownerNote: boolean;
  sharedWith: NoteShareTargetDto[];
  read: boolean | null;

  createdAt: string;
  updatedAt: string;
}
