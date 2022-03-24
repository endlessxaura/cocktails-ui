import { DrinkFilter } from "./drink-filter.model";

export class DrinkFilters {

    // Properties
    drinks: DrinkFilter[];

    // Constructor
    constructor(drinks: DrinkFilter[] = []) {
        this.drinks = drinks;
    }
}