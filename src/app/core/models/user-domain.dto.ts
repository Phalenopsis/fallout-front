import { CharacterDTO } from "../../character/models/character.dto";

export type UserDomainDTO = {
    id: number;
    email: string;
    characters: CharacterDTO[];
};