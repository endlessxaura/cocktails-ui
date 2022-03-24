import { CategoryListItem } from "./category-list-item.model";

export class CategoryList {

    // Properties
    drinks: CategoryListItem[];

    // Constructor
    constructor(drinks: CategoryListItem[] = []) {
        this.drinks = drinks;
    }
}