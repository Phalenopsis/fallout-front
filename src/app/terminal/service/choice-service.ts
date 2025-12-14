import { Observable } from "rxjs";
import { ViewOption } from "../model/view-option";

export abstract class ChoiceService {
    abstract getPossiblesChoice$(): Observable<ViewOption[]>;
}