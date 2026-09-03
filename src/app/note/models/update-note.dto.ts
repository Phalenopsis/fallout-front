import { NoteShareTargetDto } from './note-share-target.dto';
import { NoteType } from './note-type.enum';

export interface UpdateNoteDto {
  title: string;
  content: string;
  type: NoteType;
  shareTargets: NoteShareTargetDto[];
  directory: string;
}
