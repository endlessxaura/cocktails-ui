import { AlcoholicListItem } from "./alcoholic-list-item.model";

export class AlcoholicList {

    // Properties
    drinks: AlcoholicListItem[];

    // Constructor
    constructor(drinks: AlcoholicListItem[] = []) {
        this.drinks = drinks;
    }
}