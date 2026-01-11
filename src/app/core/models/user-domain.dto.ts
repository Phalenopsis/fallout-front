import { CharacterFromBackDTO } from '../../character/models/character-from-back.dto';

export type UserDomainDTO = {
  id: number;
  email: string;
  characters: CharacterFromBackDTO[];
};
