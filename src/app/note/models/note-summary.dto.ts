import { NoteType } from './note-type.enum';

export interface NoteSummaryDto {
  id: number;
  title: string;
  type: NoteType;
}
