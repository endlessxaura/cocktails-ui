export class Ingredient {

    // Properties
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: string;
    strAlcohol: string;
    strABV: string;

    // Constructor
    constructor(params: {
        id?: string,
        name?: string,
        description?: string,
        type?: string,
        alcohol?: string,
        ABV?: string
    } = {}) {
        this.idIngredient = params.id ?? '';
        this.strIngredient = params.name ?? '';
        this.strDescription = params.description ?? '';
        this.strType = params.type ?? '';
        this.strAlcohol = params.alcohol ?? '';
        this.strABV = params.ABV ?? '';
    }
}