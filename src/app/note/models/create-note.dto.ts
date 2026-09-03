import { NoteShareTargetDto } from './note-share-target.dto';
import { NoteType } from './note-type.enum';

export interface CreateNoteDto {
  title: string;
  content: string;
  type: NoteType;
  campaignId: number | null;
  characterId: number | null;
  shareTargets: NoteShareTargetDto[];
  directory: string;
}
