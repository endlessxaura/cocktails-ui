export class Drink {

    // Properties
    idDrink: string;
    strDrink: string;
    strDrinkAlternate?: any;
    strTags?: string;
    strVideo?: any;
    strCategory: string;
    strIBA?: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES?: any;
    strInstructionsDE?: string;
    strInstructionsFR?: any;
    strInstructionsIT: string;
    'strInstructionsZH-HANS'?: any;
    'strInstructionsZH-HANT'?: any;
    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: any;
    strIngredient9?: any;
    strIngredient10?: any;
    strIngredient11?: any;
    strIngredient12?: any;
    strIngredient13?: any;
    strIngredient14?: any;
    strIngredient15?: any;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: any;
    strMeasure9?: any;
    strMeasure10?: any;
    strMeasure11?: any;
    strMeasure12?: any;
    strMeasure13?: any;
    strMeasure14?: any;
    strMeasure15?: any;
    strImageSource?: string;
    strImageAttribution?: string;
    strCreativeCommonsConfirmed: string;
    dateModified?: string;

    // Constructor
    constructor(params: {
        id?: string,
        name?: string,
        category?: string,
        alcoholic?: string,
        glass?: string,
        ingredients?: string[],
        measures?: string[],
        tags?: string
    } = {}) {
        this.idDrink = params.id ?? '';
        this.strDrink = params.name ?? '';
        this.strCategory = params.category ?? '';
        this.strAlcoholic = params.alcoholic ?? '';
        this.strGlass = params.glass ?? '';
        if (params.ingredients) {
            for (let i = 1; i <= params.ingredients.length; i++) {
                this[('strIngredient' + i) as keyof Drink] = params.ingredients[i - 1]
            }
        }
        if (params.measures) {
            for (let i = 1; i <= params.measures.length; i++) {
                this[('strMeasure' + i) as keyof Drink] = params.measures[i - 1];
            }
        }
        this.strTags = params.tags ?? '';
    }
}