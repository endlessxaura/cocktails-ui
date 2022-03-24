import { IngredientListItem } from "./ingredient-list-item.model";

export class IngredientList {

    // Properties
    drinks: IngredientListItem[];

    // Constructor
    constructor(drinks: IngredientListItem[] = []) {
        this.drinks = drinks;
    }
}