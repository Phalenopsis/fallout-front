import { NoteSummaryDto } from '../models/note-summary.dto';

export interface DirectoryNode {
  name: string;
  fullPath: string;
  children: DirectoryNode[];
  notes: NoteSummaryDto[];
}

export function buildDirectoryTree(summaries: NoteSummaryDto[]): DirectoryNode {
  const root: DirectoryNode = {
    name: 'root',
    fullPath: '',
    children: [],
    notes: [],
  };

  for (const summary of summaries) {
    const rawDir = summary.directory ? summary.directory.trim() : '';
    const parts = rawDir ? rawDir.split('/').filter((p) => p.length > 0) : [];

    let current = root;
    let pathAcc = '';

    for (const part of parts) {
      pathAcc = pathAcc ? `${pathAcc}/${part}` : part;
      let child = current.children.find((c) => c.name === part);

      if (!child) {
        child = {
          name: part,
          fullPath: pathAcc,
          children: [],
          notes: [],
        };
        current.children.push(child);
      }
      current = child;
    }

    current.notes.push(summary);
  }

  return root;
}
