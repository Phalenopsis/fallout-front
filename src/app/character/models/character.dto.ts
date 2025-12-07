import { SpecialDTO } from "./special.dto";

export interface CharacterDTO {
    id: number;
    name: string;
    userId: number;
    special: SpecialDTO;
}
