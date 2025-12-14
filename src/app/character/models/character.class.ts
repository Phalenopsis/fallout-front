import { Special } from "./special.class";

export class Character {
    id?: number;
    name?: string;
    userId?: number;
    special?: Special;

    setName(name: string): void {
        this.name = name;
    }
}