export class DrinkIngredient {

    // Properties
    measure: string | null;
    ingredient: string;

    // Constructor
    constructor(measure: string, ingredient: string) {
        this.measure = measure;
        this.ingredient = ingredient;
    }

    // Accessors
    get display(): string {
        if (this.measure && this.ingredient) {
            return this.measure + ' of ' + this.ingredient;
        } else if (this.ingredient) {
            return this.ingredient;
        } else {
            return '';
        }
    }
}