// note-link.model.ts
import { NoteType } from './note-type.enum';

export interface NoteLinkMatch {
  raw: string; // ex: "[[NPC:42|Preston Garvey]]"
  type: NoteType; // NPC
  id: number; // 42
  label: string; // "Preston Garvey"
}

// Regex pour capturer [[TYPE:ID|LABEL]]
export const NOTE_LINK_REGEX =
  /\[\[(LOCATION|NPC|QUEST|FREE_NOTE|MAP|BACKGROUND):(\d+)\|([^\]]+)\]\]/g;
