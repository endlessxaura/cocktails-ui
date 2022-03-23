import { DrinkFilter } from "../models/drink-filter.model";

export class CocktailSearchFilter {
    searchString: string | null = '';
    filterPrefix = '';
    drinks: DrinkFilter[] = [];
    options: string[] = [];
}

export enum CocktailSearchFilterTypes {
    Ingredient = 'Ingredient',
    Glass = 'Glass',
    Category = 'Category',
    Alcholic = 'Alcoholic'
}