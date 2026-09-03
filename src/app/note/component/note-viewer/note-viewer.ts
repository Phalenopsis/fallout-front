import { Component, computed, input, output } from '@angular/core';
import { NoteType } from '../../models/note-type.enum';
import { NOTE_LINK_REGEX } from '../../models/note-link.model';

export interface TextSegment {
  isLink: boolean;
  text: string;
  type?: NoteType;
  id?: number;
}

@Component({
  selector: 'app-note-viewer',
  standalone: true,
  templateUrl: './note-viewer.html',
  styleUrl: './note-viewer.css',
})
export class NoteViewer {
  // Input réactif sous forme de Signal
  readonly content = input<string>('');

  // Output sous forme de fonction output()
  readonly linkClick = output<{ type: NoteType; id: number }>();

  // Calcul automatique des segments dès que `content` change
  readonly segments = computed(() => this.parseContent(this.content()));

  onLinkClick(type: NoteType, id: number): void {
    this.linkClick.emit({ type, id });
  }

  private parseContent(text: string): TextSegment[] {
    if (!text) return [];

    const result: TextSegment[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    NOTE_LINK_REGEX.lastIndex = 0;

    while ((match = NOTE_LINK_REGEX.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          isLink: false,
          text: text.substring(lastIndex, match.index),
        });
      }

      result.push({
        isLink: true,
        text: match[3],
        type: match[1] as NoteType,
        id: Number(match[2]),
      });

      lastIndex = NOTE_LINK_REGEX.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push({
        isLink: false,
        text: text.substring(lastIndex),
      });
    }

    return result;
  }
}
