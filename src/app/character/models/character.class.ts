import { OrigineDescription } from "../../terminal/character-creation/origin-creation/origine.desc";
import { Special } from "./special.class";

export class Character {
    id?: number;
    name?: string;
    userId?: number;
    special?: Special;
    origin?: OrigineDescription;

    setName(name: string): void {
        this.name = name;
    }
}