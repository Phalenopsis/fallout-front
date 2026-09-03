import { ShareTargetType } from './share-target-type.enum';

export interface NoteShareTargetDto {
  type: ShareTargetType;
  id: number;
  name: string;
}
