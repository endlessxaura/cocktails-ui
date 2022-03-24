import { GlassListFilter } from "./glass-list-item.model";

export class GlassList {

    // Properties
    drinks: GlassListFilter[];

    // Constructor
    constructor(drinks: GlassListFilter[] = []) {
        this.drinks = drinks;
    }
}