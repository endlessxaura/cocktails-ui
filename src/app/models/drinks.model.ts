import { Drink } from "./drink.model";

export class Drinks {

    // Properties
    drinks: Drink[];

    // Constructor
    constructor(drinks: Drink[] = []) {
        this.drinks = drinks;
    }
}