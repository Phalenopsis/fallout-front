import { NoteType } from './note-type.enum';

export interface CreateNoteDto {
  title: string;
  content: string;
  type: NoteType;
  campaignId: number | null;
  characterId: number | null;
  shareWithEmails: string[];
}
