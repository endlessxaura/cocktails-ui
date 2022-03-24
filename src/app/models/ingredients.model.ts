import { Ingredient } from "./ingredient.model";

export class Ingredients {

    // Properties
    ingredients: Ingredient[];

    // Constructor
    constructor(ingredients: Ingredient[] = []) {
        this.ingredients = ingredients;
    }
}