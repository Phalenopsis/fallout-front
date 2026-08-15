import { NoteType } from './note-type.enum';

export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  authorId: number;
  authorEmail: string;
  campaignId: number | null;
  characterId: number | null;
  sharedWithEmails: string[];
  createdAt: string;
  updatedAt: string;
}
