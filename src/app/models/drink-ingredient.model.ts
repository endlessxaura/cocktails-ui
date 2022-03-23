export class DrinkIngredient {

    // Properties
    measure: string | null;
    ingredient: string;
    includeLink = false;

    // Constructor
    constructor(
        measure: string,
        ingredient: string,
        includeLink = false
    ) {
        this.measure = measure;
        this.ingredient = ingredient;
        this.includeLink = includeLink;
    }
}