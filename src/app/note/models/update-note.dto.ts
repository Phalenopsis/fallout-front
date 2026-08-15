import { NoteType } from './note-type.enum';

export interface UpdateNoteDto {
  title: string;
  content: string;
  type: NoteType;
  shareWithEmails: string[];
}
